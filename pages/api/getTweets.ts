// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { Tweet } from "../../typings";
import { groq } from "next-sanity";

const feedQuery = groq`
*[_type == "tweet" && !blockTweet] {
	_id,
  _createdAt,
  _updatedAt,
  _rev,
  _type,
  blockTweet,
  text,
  username,
  profileImg,
  image
} | order(_createdAt desc)
`;

type Data = {
  tweets: Tweet[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Set headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
    res.status(200).json({ tweets });
  } catch (error) {
    console.error('Error fetching tweets from Sanity:', error);
    res.status(500).json({ tweets: [] } as any);
  }
}
