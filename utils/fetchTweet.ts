import { Tweet } from "../typings";

export const fetchTweet = async (): Promise<Tweet[]> => {
  try {
    // Add cache-busting parameter to ensure fresh data
    const timestamp = Date.now();
    
    // Use different URLs for server-side vs client-side
    let url: string;
    if (typeof window === 'undefined') {
      // Server-side: use full URL
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets?t=${timestamp}`;
    } else {
      // Client-side: use relative URL
      url = `/api/getTweets?t=${timestamp}`;
    }
    
    const res = await fetch(url, {
      cache: 'no-store' // Disable Next.js caching
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch tweets: ${res.status}`);
    }

    const data = await res.json();
    const tweets: Tweet[] = data.tweets;

    return tweets;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return []; // Return empty array as fallback
  }
};
