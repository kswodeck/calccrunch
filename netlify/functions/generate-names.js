// Netlify Serverless Function for Baby Name Generation
// Uses Google Gemini API (Free Tier: 15 req/min, 1M tokens/month)

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API configuration error' })
      };
    }

    // Parse request body
    const params = JSON.parse(event.body);
    
    // Build the prompt based on user criteria
    const prompt = buildPrompt(params);
    console.debug(prompt);
    
    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'AI service error', details: errorText })
      };
    }

    const data = await response.json();
    
    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.error('No generated text in response:', JSON.stringify(data));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'No response from AI' })
      };
    }

    console.log('AI Response:', generatedText);

    // Parse the JSON from the response
    const names = parseNamesFromResponse(generatedText, params);
    
    console.log('Parsed names:', JSON.stringify(names, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ names })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};

function buildPrompt(params) {
  const {
    gender = 'any',
    origins = [],
    startsWith = '',
    endsWith = '',
    minLength = 0,
    maxLength = 0,
    syllables = 0,
    popularity = 'any',
    style = 'any',
    count = 10,
    lastName = '',
    firstName = '',
    middleName = '',
    genFirst = true,
    genMiddle = false,
    excludeNames = '',
    siblingNames = '',
    alliteration = false,
    avoidRhyme = true,
    uniqueInitials = false
  } = params;

  // Determine what we're generating
  const needFirstName = genFirst && !firstName;
  const needMiddleName = genMiddle && !middleName;
  
  // Request extra names to ensure we have enough
  const requestCount = Math.min(count + 8, 50);

  // Build gender instruction
  let genderInstruction = '';
  if (gender === 'girl') {
    genderInstruction = 'Generate ONLY feminine/girl names.';
  } else if (gender === 'boy') {
    genderInstruction = 'Generate ONLY masculine/boy names.';
  } else if (gender === 'neutral') {
    genderInstruction = 'Generate ONLY gender-neutral/unisex names.';
  } else {
    genderInstruction = 'Generate a mix of boy, girl, and gender-neutral names.';
  }

  // Build origin instruction
  let originInstruction = '';
  if (origins.length > 0) {
    originInstruction = `Cultural origins should be from: ${origins.join(', ')}. You may include closely related origins if needed.`;
  } else {
    originInstruction = 'Include names from diverse cultural origins.';
  }

  // Build constraints list
  let constraints = [];
  
  if (startsWith) {
    constraints.push(`Names MUST start with the letter(s) "${startsWith.toUpperCase()}"`);
  }
  if (endsWith) {
    constraints.push(`Names MUST end with the letter(s) "${endsWith.toLowerCase()}"`);
  }
  if (minLength > 0) {
    constraints.push(`Names must have at least ${minLength} letters`);
  }
  if (maxLength > 0) {
    constraints.push(`Names must have no more than ${maxLength} letters`);
  }
  if (syllables > 0) {
    if (syllables >= 4) {
      constraints.push(`Names should have 4 or more syllables`);
    } else {
      constraints.push(`Names should have exactly ${syllables} syllable${syllables > 1 ? 's' : ''}`);
    }
  }
  
  // Alliteration constraint
  if (alliteration && lastName) {
    const firstLetter = lastName[0].toUpperCase();
    constraints.push(`Names MUST start with the letter "${firstLetter}" to match the last name "${lastName}" (alliteration required)`);
  }
  
  // Avoid rhyme constraint
  if (avoidRhyme && lastName && lastName.length >= 2) {
    const ending = lastName.slice(-2).toLowerCase();
    constraints.push(`Names should NOT end with "${ending}" to avoid rhyming with the last name "${lastName}"`);
  }
  
  // Unique initials constraint
  if (uniqueInitials) {
    if (firstName) {
      constraints.push(`Names must NOT start with "${firstName[0].toUpperCase()}" (unique initials required, first name is ${firstName})`);
    }
    if (middleName) {
      constraints.push(`Names must NOT start with "${middleName[0].toUpperCase()}" (unique initials required, middle name is ${middleName})`);
    }
    if (lastName) {
      constraints.push(`Names must NOT start with "${lastName[0].toUpperCase()}" (unique initials required, last name is ${lastName})`);
    }
  }

  // Build popularity instruction
  let popularityInstruction = '';
  if (popularity === 'top100') {
    popularityInstruction = 'Focus on very popular, well-known names that would be in the top 100.';
  } else if (popularity === 'top500') {
    popularityInstruction = 'Focus on moderately popular names.';
  } else if (popularity === 'uncommon') {
    popularityInstruction = 'Focus on uncommon names that are less frequently used but still recognizable.';
  } else if (popularity === 'rare') {
    popularityInstruction = 'Focus on rare, unique names that are seldom used.';
  }

  // Build style instruction
  let styleInstruction = '';
  if (style && style !== 'any') {
    const styleDescriptions = {
      classic: 'classic, timeless names that have been popular for generations',
      modern: 'modern, trendy, contemporary names',
      vintage: 'vintage, old-fashioned names making a comeback',
      nature: 'nature-inspired names (flowers, trees, celestial, elements)',
      royal: 'royal, elegant, sophisticated names',
      strong: 'strong, powerful names with bold sounds',
      gentle: 'gentle, soft-sounding names'
    };
    styleInstruction = `Style preference: ${styleDescriptions[style] || style}.`;
  }

  // Build context about existing names
  let contextInfo = [];
  if (lastName) {
    contextInfo.push(`Last name: "${lastName}" - generated names should flow well when spoken with this last name.`);
  }
  if (firstName && !needFirstName) {
    contextInfo.push(`First name is already chosen: "${firstName}" - consider this when generating middle names.`);
  }
  if (middleName && !needMiddleName) {
    contextInfo.push(`Middle name is already chosen: "${middleName}" - consider this when generating first names.`);
  }
  if (siblingNames) {
    contextInfo.push(`Sibling names: ${siblingNames} - generated names should complement these siblings' names in style.`);
  }
  if (excludeNames) {
    contextInfo.push(`DO NOT include these names: ${excludeNames}`);
  }

  // Determine output format based on what's being generated
  let outputFormat = '';
  let outputExample = '';
  
  if (needFirstName && needMiddleName) {
    // Generate pairs of first + middle names
    outputFormat = `Each object must have:
- "firstName": the suggested first name
- "middleName": a complementary middle name that pairs well with the first name
- "firstNameData": object with {gender, origins, meaning, syllables, popularity, style}
- "middleNameData": object with {gender, origins, meaning, syllables, popularity, style}`;
    
    outputExample = `[
  {
    "firstName": "Charlotte",
    "middleName": "Rose",
    "firstNameData": {"gender": "f", "origins": ["french", "english"], "meaning": "Free woman", "syllables": 2, "popularity": 92, "style": ["classic", "royal"]},
    "middleNameData": {"gender": "f", "origins": ["latin", "english"], "meaning": "Rose flower", "syllables": 1, "popularity": 75, "style": ["classic", "nature"]}
  },
  {
    "firstName": "William",
    "middleName": "James",
    "firstNameData": {"gender": "m", "origins": ["german", "english"], "meaning": "Resolute protector", "syllables": 2, "popularity": 93, "style": ["classic", "royal"]},
    "middleNameData": {"gender": "m", "origins": ["hebrew", "english"], "meaning": "Supplanter", "syllables": 1, "popularity": 95, "style": ["classic", "strong"]}
  }
]`;
  } else if (needFirstName) {
    // Generate first names only
    outputFormat = `Each object must have:
- "firstName": the suggested first name
- "firstNameData": object with {gender, origins, meaning, syllables, popularity, style}`;
    
    outputExample = `[
  {
    "firstName": "Charlotte",
    "firstNameData": {"gender": "f", "origins": ["french", "english"], "meaning": "Free woman", "syllables": 2, "popularity": 92, "style": ["classic", "royal"]}
  },
  {
    "firstName": "William",
    "firstNameData": {"gender": "m", "origins": ["german", "english"], "meaning": "Resolute protector", "syllables": 2, "popularity": 93, "style": ["classic", "royal"]}
  }
]`;
  } else if (needMiddleName) {
    // Generate middle names only
    outputFormat = `Each object must have:
- "middleName": the suggested middle name
- "middleNameData": object with {gender, origins, meaning, syllables, popularity, style}`;
    
    outputExample = `[
  {
    "middleName": "Rose",
    "middleNameData": {"gender": "f", "origins": ["latin", "english"], "meaning": "Rose flower", "syllables": 1, "popularity": 75, "style": ["classic", "nature"]}
  },
  {
    "middleName": "James",
    "middleNameData": {"gender": "m", "origins": ["hebrew", "english"], "meaning": "Supplanter", "syllables": 1, "popularity": 95, "style": ["classic", "strong"]}
  }
]`;
  }

  // Build the what-to-generate instruction
  let generateInstruction = '';
  if (needFirstName && needMiddleName) {
    generateInstruction = `Generate ${requestCount} COMPLETE NAME PAIRS. Each pair should have a first name AND a complementary middle name that sound good together.`;
  } else if (needFirstName) {
    generateInstruction = `Generate ${requestCount} FIRST NAMES suitable as first/given names.`;
  } else if (needMiddleName) {
    generateInstruction = `Generate ${requestCount} MIDDLE NAMES suitable as middle names. Middle names are often shorter, classic names or family names.`;
  }

  // Assemble the full prompt
  const prompt = `You are an expert baby name consultant. Your task is to generate baby name suggestions based on specific criteria.

=== TASK ===
${generateInstruction}

=== GENDER REQUIREMENT ===
${genderInstruction}

=== CULTURAL ORIGINS ===
${originInstruction}

${constraints.length > 0 ? `=== CONSTRAINTS (MUST FOLLOW) ===
${constraints.map((c, i) => `${i + 1}. ${c}`).join('\n')}` : ''}

${popularityInstruction ? `=== POPULARITY ===
${popularityInstruction}` : ''}

${styleInstruction ? `=== STYLE ===
${styleInstruction}` : ''}

${contextInfo.length > 0 ? `=== CONTEXT ===
${contextInfo.join('\n')}` : ''}

=== CRITICAL REQUIREMENTS ===
1. You MUST generate EXACTLY ${requestCount} suggestions - no fewer, no exceptions
2. All names must be real, usable baby names (no made-up or fictional names)
3. Each suggestion must be unique
4. Follow the gender requirement strictly
5. Follow all constraints listed above
6. If constraints make it hard to find ${requestCount} names, slightly relax the less critical preferences (like exact syllable count) but NEVER relax gender or the starting letter constraints

=== OUTPUT FORMAT ===
Respond with ONLY a valid JSON array. No other text, no explanations, no markdown formatting.

${outputFormat}

For gender: "m" = boy/masculine, "f" = girl/feminine, "n" = neutral/unisex
For origins: use lowercase (english, hebrew, greek, latin, irish, scottish, german, french, italian, spanish, arabic, indian, japanese, chinese, korean, african, scandinavian, slavic, welsh, american)
For style: use lowercase array (classic, modern, vintage, nature, royal, strong, gentle, unique, traditional, trendy)
For popularity: 1-100 scale where 100 is most popular
For syllables: count the syllables accurately

=== EXAMPLE OUTPUT ===
${outputExample}

NOW GENERATE EXACTLY ${requestCount} SUGGESTIONS AS A JSON ARRAY:`;

  return prompt;
}

function parseNamesFromResponse(text, params) {
  const { genFirst = true, genMiddle = false, firstName = '', middleName = '' } = params;
  const needFirstName = genFirst && !firstName;
  const needMiddleName = genMiddle && !middleName;
  
  try {
    // Try to extract JSON from the response
    let jsonStr = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7);
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3);
    }
    
    jsonStr = jsonStr.trim();
    
    // Find the JSON array in the response
    const startIdx = jsonStr.indexOf('[');
    const endIdx = jsonStr.lastIndexOf(']');
    
    if (startIdx !== -1 && endIdx !== -1) {
      jsonStr = jsonStr.slice(startIdx, endIdx + 1);
    }
    
    const rawNames = JSON.parse(jsonStr);
    
    // Validate and normalize the data
    return rawNames.map(entry => {
      const result = {};
      
      // Handle firstName
      if (entry.firstName) {
        result.firstName = String(entry.firstName);
        const data = entry.firstNameData || {};
        result.firstNameData = {
          gender: ['m', 'f', 'n'].includes(data.gender) ? data.gender : 'n',
          origins: Array.isArray(data.origins) ? data.origins : ['unknown'],
          meaning: String(data.meaning || 'Beautiful name'),
          syllables: parseInt(data.syllables) || 2,
          popularity: Math.min(100, Math.max(1, parseInt(data.popularity) || 50)),
          style: Array.isArray(data.style) ? data.style : ['classic']
        };
      }
      
      // Handle middleName
      if (entry.middleName) {
        result.middleName = String(entry.middleName);
        const data = entry.middleNameData || {};
        result.middleNameData = {
          gender: ['m', 'f', 'n'].includes(data.gender) ? data.gender : 'n',
          origins: Array.isArray(data.origins) ? data.origins : ['unknown'],
          meaning: String(data.meaning || 'Beautiful name'),
          syllables: parseInt(data.syllables) || 2,
          popularity: Math.min(100, Math.max(1, parseInt(data.popularity) || 50)),
          style: Array.isArray(data.style) ? data.style : ['classic']
        };
      }
      
      // Handle legacy format where AI returns just "name"
      if (!entry.firstName && !entry.middleName && entry.name) {
        if (needFirstName) {
          result.firstName = String(entry.name);
          result.firstNameData = {
            gender: ['m', 'f', 'n'].includes(entry.gender) ? entry.gender : 'n',
            origins: Array.isArray(entry.origins) ? entry.origins : ['unknown'],
            meaning: String(entry.meaning || 'Beautiful name'),
            syllables: parseInt(entry.syllables) || 2,
            popularity: Math.min(100, Math.max(1, parseInt(entry.popularity) || 50)),
            style: Array.isArray(entry.style) ? entry.style : ['classic']
          };
        } else if (needMiddleName) {
          result.middleName = String(entry.name);
          result.middleNameData = {
            gender: ['m', 'f', 'n'].includes(entry.gender) ? entry.gender : 'n',
            origins: Array.isArray(entry.origins) ? entry.origins : ['unknown'],
            meaning: String(entry.meaning || 'Beautiful name'),
            syllables: parseInt(entry.syllables) || 2,
            popularity: Math.min(100, Math.max(1, parseInt(entry.popularity) || 50)),
            style: Array.isArray(entry.style) ? entry.style : ['classic']
          };
        }
      }
      
      return result;
    }).filter(entry => entry.firstName || entry.middleName);
    
  } catch (error) {
    console.error('Error parsing names from response:', error, 'Text:', text);
    return [];
  }
}