import OpenAI from 'openai';
import config from './config';

const client = new OpenAI({
  apiKey: config.OPEN_AI_KEY,
});

async function getCompletion() {
  try {
    const response = await client.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-4o-mini',
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCompletion();
