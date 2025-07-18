import type { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc } from "firebase/firestore";
import db from "../../firebase.js";

type Data = {
  message: string;
  bookmarkId?: string;
};

type BookmarkBody = {
  tweetId: string;
  text: string;
  username: string;
  profileImg: string;
  image?: string;
  originalCreatedAt: string;
  userId: string;
  userDisplayName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data: BookmarkBody = JSON.parse(req.body);

    // Check if bookmark already exists
    const bookmarksRef = collection(db, "bookmarks");
    const q = query(
      bookmarksRef,
      where("tweetId", "==", data.tweetId),
      where("userId", "==", data.userId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If bookmark exists, remove it (toggle functionality)
      const bookmarkDoc = querySnapshot.docs[0];
      await deleteDoc(bookmarkDoc.ref);
      return res.status(200).json({ message: "Bookmark removed successfully" });
    }

    // Add new bookmark
    const bookmark = {
      ...data,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "bookmarks"), bookmark);

    res.status(200).json({
      message: "Bookmark added successfully",
      bookmarkId: docRef.id,
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
