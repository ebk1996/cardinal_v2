// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { TweetBody } from "../../typings";

type Data = {
  message: string;
  details?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Handle both string and already parsed object bodies
    const data: TweetBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    // Use Sanity client directly instead of manual fetch
    const doc = {
      _type: "tweet",
      text: data.text,
      username: data.username,
      blockTweet: false,
      profileImg: data.profileImg,
      image: data.image,
    };

    const result = await sanityClient.create(doc);
    
    console.log('Tweet created:', result._id);
    res.status(200).json({ message: "Added" });
  } catch (error: any) {
    console.error('Error adding tweet:', error);
    
    // More detailed error message
    const errorMessage = error.message || error.details?.description || "Error adding tweet";
    const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({ 
      message: errorMessage,
      details: error.details || "Unknown error"
    });
  }
}
