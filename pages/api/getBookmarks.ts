import type { NextApiRequest, NextApiResponse } from "next";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import db from "../../firebase.js";

export interface BookmarkedTweet {
  id: string;
  tweetId: string;
  text: string;
  username: string;
  profileImg: string;
  image?: string;
  originalCreatedAt: string;
  createdAt: any;
  userId: string;
  userDisplayName: string;
}

type Data = {
  bookmarks?: BookmarkedTweet[];
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
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookmarksRef = collection(db, "bookmarks");
    const q = query(
      bookmarksRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const bookmarks: BookmarkedTweet[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bookmarks.push({
        id: doc.id,
        tweetId: data.tweetId,
        text: data.text,
        username: data.username,
        profileImg: data.profileImg,
        image: data.image,
        originalCreatedAt: data.originalCreatedAt,
        createdAt: data.createdAt,
        userId: data.userId,
        userDisplayName: data.userDisplayName,
      });
    });

    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
