import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import BookmarkCard from "../components/BookmarkCard";
import { auth } from "../firebase/firebase";
import { useBookmarks } from "../utils/useBookmarks";

const Bookmarks = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const { bookmarkedTweets, loading, removeBookmark } = useBookmarks();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-[#15202b] h-screen overflow-hidden">
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Bookmarks - Cardinal&trade;</title>
          <meta name="description" content="Your saved tweets and bookmarks" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
            <div className="sticky top-0 bg-white dark:bg-[#15202b] p-4 border-b dark:border-gray-800 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Bookmarks
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    @{user?.displayName || "user"}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {bookmarkedTweets.length} {bookmarkedTweets.length === 1 ? 'Tweet' : 'Tweets'}
                </div>
              </div>
            </div>
            
            {!user ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Save Tweets for later
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Don&apos;t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to view your bookmarks.
                </p>
              </div>
            ) : loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading your bookmarks...</p>
              </div>
            ) : bookmarkedTweets.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  No bookmarks yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start bookmarking tweets you want to save for later! Look for the bookmark icon on tweets.
                </p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {bookmarkedTweets.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onRemove={removeBookmark}
                  />
                ))}
              </div>
            )}
          </div>
          <Widgets />
        </main>
      </div>
    </div>
  );
};

export default Bookmarks;
