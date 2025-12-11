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
    siblingNames = ''
  } = params;

  // Request extra names to ensure we have enough after any filtering
  const requestCount = Math.min(count + 5, 50);

  let genderText = 'any gender (boy, girl, or gender-neutral)';
  if (gender === 'girl') genderText = 'girl/feminine names only';
  else if (gender === 'boy') genderText = 'boy/masculine names only';
  else if (gender === 'neutral') genderText = 'gender-neutral/unisex names only';

  let originsText = 'any cultural origin (be diverse)';
  if (origins.length > 0) {
    originsText = `primarily from these cultural origins: ${origins.join(', ')} (but you may include closely related origins if needed to reach the count)`;
  }

  let constraints = [];
  if (startsWith) constraints.push(`should start with "${startsWith}" (strong preference)`);
  if (endsWith) constraints.push(`should end with "${endsWith}" (strong preference)`);
  if (minLength > 0) constraints.push(`minimum ${minLength} letters`);
  if (maxLength > 0) constraints.push(`maximum ${maxLength} letters`);
  if (syllables > 0) {
    if (syllables >= 4) constraints.push(`preferably 4 or more syllables`);
    else constraints.push(`preferably ${syllables} syllable${syllables > 1 ? 's' : ''}`);
  }

  let popularityText = '';
  if (popularity === 'top100') popularityText = 'Prefer popular/common names (well-known names)';
  else if (popularity === 'top500') popularityText = 'Prefer moderately popular names';
  else if (popularity === 'uncommon') popularityText = 'Prefer uncommon/less popular names';
  else if (popularity === 'rare') popularityText = 'Prefer rare and unique names';

  let styleText = '';
  if (style !== 'any') {
    const styleMap = {
      classic: 'classic and timeless style',
      modern: 'modern and trendy style',
      vintage: 'vintage and old-fashioned style',
      nature: 'nature-inspired style',
      royal: 'royal and elegant style',
      strong: 'strong and powerful style',
      gentle: 'gentle and soft-sounding style'
    };
    styleText = styleMap[style] || style;
  }

  let generateWhat = [];
  if (genFirst && !firstName) generateWhat.push('first names');
  if (genMiddle && !middleName) generateWhat.push('middle names');
  
  let contextText = '';
  if (lastName) contextText += `The last name is "${lastName}" - names should flow well with it.`;
  if (firstName) contextText += ` The first name is already chosen: "${firstName}" - consider this when suggesting middle names.`;
  if (middleName) contextText += ` The middle name is already chosen: "${middleName}" - consider this when suggesting first names.`;
  if (siblingNames) contextText += ` Sibling names are: ${siblingNames} - suggest names that complement them.`;
  if (excludeNames) contextText += ` Do NOT include these names: ${excludeNames}.`;

  const prompt = `You are an expert baby name consultant with extensive knowledge of names from all cultures and time periods.

YOUR TASK: Generate EXACTLY ${requestCount} unique baby name suggestions. This count is MANDATORY - you must provide exactly ${requestCount} names, no fewer.

CRITERIA (apply as preferences, not hard filters - the count requirement takes priority):
• Gender: ${genderText}
• Cultural Origins: ${originsText}
${constraints.length > 0 ? `• Preferences: ${constraints.join('; ')}` : ''}
${popularityText ? `• Popularity: ${popularityText}` : ''}
${styleText ? `• Style: ${styleText}` : ''}
• Type: ${generateWhat.join(' and ')}
${contextText ? `• Context: ${contextText}` : ''}

IMPORTANT INSTRUCTIONS:
1. You MUST return exactly ${requestCount} names - this is non-negotiable
2. All names must be real, usable baby names (no made-up names)
3. Each name must be unique within your response
4. If you're having trouble finding ${requestCount} names that match ALL criteria perfectly, slightly relax the less important criteria (like exact syllable count or specific origin) while keeping the core requirements (gender, general style)
5. Prioritize: Gender accuracy > Name quality > Cultural origin > Other preferences

OUTPUT FORMAT: Respond with ONLY a valid JSON array, no other text or explanation.
Each object must have these exact fields:
{
  "name": "string - the name",
  "gender": "m" for boy, "f" for girl, "n" for neutral,
  "origins": ["array", "of", "origin", "strings"],
  "meaning": "string - brief meaning",
  "syllables": number,
  "popularity": number 1-100 (100 = most popular),
  "style": ["array", "of", "style", "tags"]
}

Valid origins: english, hebrew, greek, latin, irish, scottish, german, french, italian, spanish, arabic, indian, japanese, chinese, korean, african, scandinavian, slavic, welsh, american
Valid styles: classic, modern, vintage, nature, royal, strong, gentle, unique, traditional, trendy

NOW GENERATE EXACTLY ${requestCount} NAMES AS A JSON ARRAY:`;
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