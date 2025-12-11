// Netlify Serverless Function for Baby Name Generation
// Uses Google Gemini API (Free Tier: 15 req/min, 1M tokens/month)

export async function handler(event, context) {
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
            maxOutputTokens: 2048,
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

    // Parse the JSON from the response
    const names = parseNamesFromResponse(generatedText);
    
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
}

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
    siblingNames = ''
  } = params;

  let genderText = 'any gender (boy, girl, or gender-neutral)';
  if (gender === 'girl') genderText = 'girl/feminine';
  else if (gender === 'boy') genderText = 'boy/masculine';
  else if (gender === 'neutral') genderText = 'gender-neutral/unisex';

  let originsText = 'any cultural origin';
  if (origins.length > 0) {
    originsText = `these cultural origins: ${origins.join(', ')}`;
  }

  let constraints = [];
  if (startsWith) constraints.push(`must start with "${startsWith}"`);
  if (endsWith) constraints.push(`must end with "${endsWith}"`);
  if (minLength > 0) constraints.push(`minimum ${minLength} letters`);
  if (maxLength > 0) constraints.push(`maximum ${maxLength} letters`);
  if (syllables > 0) {
    if (syllables >= 4) constraints.push(`4 or more syllables`);
    else constraints.push(`exactly ${syllables} syllable${syllables > 1 ? 's' : ''}`);
  }

  let popularityText = '';
  if (popularity === 'top100') popularityText = 'very popular/common names (top 100)';
  else if (popularity === 'top500') popularityText = 'moderately popular names (top 500)';
  else if (popularity === 'uncommon') popularityText = 'uncommon/less popular names';
  else if (popularity === 'rare') popularityText = 'rare and unique names';

  let styleText = '';
  if (style !== 'any') {
    const styleMap = {
      classic: 'classic and timeless',
      modern: 'modern and trendy',
      vintage: 'vintage and old-fashioned',
      nature: 'nature-inspired',
      royal: 'royal and elegant',
      strong: 'strong and powerful',
      gentle: 'gentle and soft-sounding'
    };
    styleText = styleMap[style] || style;
  }

  let generateWhat = [];
  if (genFirst && !firstName) generateWhat.push('first names');
  if (genMiddle && !middleName) generateWhat.push('middle names');
  
  let contextText = '';
  if (lastName) contextText += `\nThe last name is "${lastName}" - names should flow well with it.`;
  if (firstName) contextText += `\nThe first name is already chosen: "${firstName}" - consider this when suggesting middle names.`;
  if (middleName) contextText += `\nThe middle name is already chosen: "${middleName}" - consider this when suggesting first names.`;
  if (siblingNames) contextText += `\nSibling names are: ${siblingNames} - suggest names that match in style.`;
  if (excludeNames) contextText += `\nDo NOT include these names: ${excludeNames}`;

  const prompt = `You are a baby name expert. Generate exactly ${count} unique baby name suggestions based on these criteria:

**Gender:** ${genderText}
**Cultural Origins:** ${originsText}
${constraints.length > 0 ? `**Constraints:** ${constraints.join(', ')}` : ''}
${popularityText ? `**Popularity:** ${popularityText}` : ''}
${styleText ? `**Style:** ${styleText}` : ''}
**Generate:** ${generateWhat.join(' and ')}
${contextText}

IMPORTANT: Respond with ONLY a valid JSON array, no other text. Each object must have these exact fields:
- "name": the name (string)
- "gender": "m" for boy, "f" for girl, "n" for neutral
- "origins": array of origin strings like ["english", "hebrew"]
- "meaning": brief meaning (string)
- "syllables": number of syllables (integer)
- "popularity": estimated popularity score 1-100 (100 being most popular currently in 2024)
- "style": array of style tags like ["classic", "gentle"]

Example format:
[
  {"name": "Olivia", "gender": "f", "origins": ["latin"], "meaning": "Olive tree", "syllables": 4, "popularity": 95, "style": ["classic", "gentle"]},
  {"name": "Liam", "gender": "m", "origins": ["irish"], "meaning": "Strong-willed warrior", "syllables": 1, "popularity": 98, "style": ["modern", "strong"]}
]

Generate ${count} names now as a JSON array only:`;

  return prompt;
}

function parseNamesFromResponse(text) {
  try {
    // Try to extract JSON from the response
    // Sometimes the AI adds markdown code blocks or extra text
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
    
    const names = JSON.parse(jsonStr);
    
    // Validate and clean up the data
    return names.map(name => ({
      name: String(name.name || ''),
      gender: ['m', 'f', 'n'].includes(name.gender) ? name.gender : 'n',
      origins: Array.isArray(name.origins) ? name.origins : ['unknown'],
      meaning: String(name.meaning || 'Beautiful name'),
      syllables: parseInt(name.syllables) || 2,
      popularity: Math.min(100, Math.max(1, parseInt(name.popularity) || 50)),
      style: Array.isArray(name.style) ? name.style : ['classic']
    })).filter(name => name.name.length > 0);
    
  } catch (error) {
    console.error('Error parsing names from response:', error, 'Text:', text);
    return [];
  }
}