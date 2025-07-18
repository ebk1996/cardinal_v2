import type { NextApiRequest, NextApiResponse } from "next";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../../firebase.js";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { bookmarkId } = req.query;

    if (!bookmarkId || typeof bookmarkId !== "string") {
      return res.status(400).json({ message: "Bookmark ID is required" });
    }

    const bookmarkRef = doc(db, "bookmarks", bookmarkId);
    await deleteDoc(bookmarkRef);

    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
