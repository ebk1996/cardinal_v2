import type { NextApiRequest, NextApiResponse } from "next";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase.js";

type Data = {
  isBookmarked?: boolean;
  bookmarkId?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { tweetId, userId } = req.query;

    if (!tweetId || !userId) {
      return res.status(400).json({ message: "Tweet ID and User ID are required" });
    }

    const bookmarksRef = collection(db, "bookmarks");
    const q = query(
      bookmarksRef,
      where("tweetId", "==", tweetId),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      res.status(200).json({ isBookmarked: false });
    } else {
      const bookmarkDoc = querySnapshot.docs[0];
      res.status(200).json({ 
        isBookmarked: true, 
        bookmarkId: bookmarkDoc.id 
      });
    }
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
