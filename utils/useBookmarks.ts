import { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  orderBy,
  doc
} from "firebase/firestore";
import db from "../firebase.js";
import toast from "react-hot-toast";

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

export const useBookmarks = () => {
  const [user] = useAuthState(auth);
  const [bookmarkedTweets, setBookmarkedTweets] = useState<BookmarkedTweet[]>([]);
  const [loading, setLoading] = useState(false);

  // Check if a specific tweet is bookmarked
  const isBookmarked = useCallback(async (tweetId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const bookmarksRef = collection(db, "bookmarks");
      const q = query(
        bookmarksRef,
        where("tweetId", "==", tweetId),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking bookmark status:", error);
      return false;
    }
  }, [user]);

  // Toggle bookmark for a tweet
  const toggleBookmark = useCallback(async (tweet: any) => {
    if (!user) {
      toast.error("Please sign in to bookmark tweets");
      return false;
    }

    const bookmarkToast = toast.loading("Processing bookmark...");

    try {
      const bookmarksRef = collection(db, "bookmarks");
      const q = query(
        bookmarksRef,
        where("tweetId", "==", tweet._id),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Remove bookmark if it exists
        const bookmarkDoc = querySnapshot.docs[0];
        await deleteDoc(bookmarkDoc.ref);
        toast.success("Bookmark removed!", { id: bookmarkToast });
        return false;
      } else {
        // Add new bookmark
        const bookmarkData = {
          tweetId: tweet._id,
          text: tweet.text,
          username: tweet.username,
          profileImg: tweet.profileImg,
          image: tweet.image,
          originalCreatedAt: tweet._createdAt,
          userId: user.uid,
          userDisplayName: user.displayName || user.email || "Anonymous",
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "bookmarks"), bookmarkData);
        toast.success("Tweet bookmarked!", { id: bookmarkToast });
        return true;
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to bookmark tweet", { id: bookmarkToast });
      return false;
    }
  }, [user]);

  // Fetch all bookmarks for the current user
  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarkedTweets([]);
      return;
    }
    
    setLoading(true);
    try {
      const bookmarksRef = collection(db, "bookmarks");
      const q = query(
        bookmarksRef,
        where("userId", "==", user.uid),
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

      setBookmarkedTweets(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setBookmarkedTweets([]);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Remove a bookmark by ID
  const removeBookmark = useCallback(async (bookmarkId: string) => {
    try {
      const bookmarkRef = doc(db, "bookmarks", bookmarkId);
      await deleteDoc(bookmarkRef);
      setBookmarkedTweets(prev => prev.filter(tweet => tweet.id !== bookmarkId));
      toast.success("Bookmark removed!");
      return true;
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Failed to remove bookmark");
      return false;
    }
  }, []);

  // Fetch bookmarks when user changes
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarkedTweets,
    loading,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    refetchBookmarks: fetchBookmarks,
  };
};
