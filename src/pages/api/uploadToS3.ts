// pages/api/uploadToS3.ts

import type { NextApiRequest, NextApiResponse } from 'next'; // Importing Next.js types
import AWS from 'aws-sdk'; // Importing AWS SDK for interacting with S3
import nextCors from 'nextjs-cors'; // Importing CORS middleware

// Configuring the S3 client with credentials and region from environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

// API route handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Enabling CORS for the request
  await nextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allowed methods
    origin: '*', // Allow all origins
    optionsSuccessStatus: 200, // Response status for successful OPTIONS request
  });

  // Handling only POST requests
  if (req.method === 'POST') {
    const { fileContent, fileName } = req.body; // Extracting file content and name from the request body

    // Setting up parameters for S3 upload
    const params = {
      Bucket: 'ming-nft-text', // S3 bucket name
      Key: `chat_histories/${fileName}`, // S3 object key (file path)
      Body: Buffer.from(JSON.stringify(fileContent), 'utf-8'), // File content as buffer
      ContentType: 'application/json', // MIME type of the file
    };

    try {
      // Uploading the file to S3
      const data = await s3.upload(params).promise();
      res.status(200).json({ url: data.Location }); // Sending back the file URL on success
    } catch (error) {
      console.error('Error uploading to S3:', error); // Logging the error
      res.status(500).json({ error: 'Error uploading to S3' }); // Sending back an error response
    }
  } else {
    // Handling unsupported methods
    res.status(405).json({ error: 'Method not allowed' }); // Sending back 405 Method Not Allowed
  }
};
