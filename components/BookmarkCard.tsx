import React from "react";
import { motion } from "framer-motion";
import TimeAgo from "react-timeago";
import Tweet from "./Tweet";
import type { BookmarkedTweet } from "../pages/api/getBookmarks";

interface BookmarkCardProps {
  bookmark: BookmarkedTweet;
  onRemove: (bookmarkId: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onRemove }) => {
  // Convert bookmark to Tweet format for the Tweet component
  const tweetData = {
    _id: bookmark.tweetId,
    text: bookmark.text,
    username: bookmark.username,
    profileImg: bookmark.profileImg,
    image: bookmark.image,
    _createdAt: bookmark.originalCreatedAt,
    _updatedAt: bookmark.originalCreatedAt,
    _rev: "",
    _type: "tweet" as const,
    blockTweet: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group"
    >
      {/* Bookmark Header with Snapshot Info */}
      <div className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent p-4 mb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Saved by {bookmark.userDisplayName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                <TimeAgo 
                  date={bookmark.createdAt?.toDate?.() || new Date()} 
                />
              </span>
            </div>
          </div>
          
          {/* Remove bookmark button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(bookmark.id)}
            className="opacity-0 group-hover:opacity-100 
                     bg-red-500 hover:bg-red-600 text-white 
                     p-2 rounded-full shadow-lg
                     transition-all duration-200"
            title="Remove bookmark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Original Tweet Content */}
      <div className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden border dark:border-gray-700">
        <Tweet tweet={tweetData} pushNote={false} />
      </div>
    </motion.div>
  );
};

export default BookmarkCard;
