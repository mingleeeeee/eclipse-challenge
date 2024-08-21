import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Initial system message for the chat
const systemMessage = {
  role: 'system',
  content: 'You are a helpful assistant that provides detailed and accurate lessons on Japanese, still you are able to speak English. You are able to speak Japanese and English at the same time.'
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']); // Allow only POST requests
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return 405 Method Not Allowed if not POST
    return;
  }

  const { messages } = req.body; // Extract messages from the request body

  try {
    // Make a POST request to OpenAI's API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o', // Specify the model to use
        messages: [systemMessage, ...messages] // Include the system message and user messages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use API key from environment variables
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data); // Return the response data from OpenAI's API
  } catch (error) {
    // Log and return an error message if the request fails
    //console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error processing request' });
  }
}
