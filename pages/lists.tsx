import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { auth } from "../firebase/firebase";

interface TwitterList {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  createdAt: string;
  creator: string;
  coverImage?: string;
}

const Lists = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"your" | "following">("your");
  const [lists] = useState<TwitterList[]>([
    {
      id: 1,
      name: "Web Developers",
      description: "Amazing developers sharing tips and tricks about web development",
      memberCount: 42,
      isPrivate: false,
      createdAt: "2024-01-10",
      creator: "you",
    },
    {
      id: 2,
      name: "Tech News",
      description: "Latest updates from the tech world",
      memberCount: 128,
      isPrivate: false,
      createdAt: "2024-01-05",
      creator: "you",
    },
    {
      id: 3,
      name: "Personal Favorites",
      description: "My favorite accounts to follow",
      memberCount: 15,
      isPrivate: true,
      createdAt: "2024-01-01",
      creator: "you",
    },
  ]);

  const [followingLists] = useState<TwitterList[]>([
    {
      id: 4,
      name: "JavaScript Community",
      description: "Best JS developers and resources",
      memberCount: 89,
      isPrivate: false,
      createdAt: "2024-01-12",
      creator: "jsmaster",
    },
    {
      id: 5,
      name: "Design Inspiration",
      description: "UI/UX designers and amazing designs",
      memberCount: 156,
      isPrivate: false,
      createdAt: "2024-01-08",
      creator: "designguru",
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const currentLists = activeTab === "your" ? lists : followingLists;

  return (
    <div className="dark:bg-[#15202b] h-screen overflow-hidden">
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Lists - Cardinal&trade;</title>
          <meta name="description" content="Discover and manage your Twitter lists" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
            <div className="sticky top-0 bg-white dark:bg-[#15202b] border-b dark:border-gray-800 z-10">
              <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Lists
                </h1>
                
                {/* Tabs */}
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("your")}
                    className={`pb-2 px-1 border-b-2 transition-colors ${
                      activeTab === "your"
                        ? "border-blue-500 text-gray-800 dark:text-white"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    Your Lists
                  </button>
                  <button
                    onClick={() => setActiveTab("following")}
                    className={`pb-2 px-1 border-b-2 transition-colors ${
                      activeTab === "following"
                        ? "border-blue-500 text-gray-800 dark:text-white"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    Following
                  </button>
                </div>
              </div>
            </div>
            
            {!user ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Discover new Lists
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to create and follow Lists.
                </p>
              </div>
            ) : currentLists.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {activeTab === "your" ? "You haven&apos;t created any Lists yet" : "You&apos;re not following any Lists yet"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {activeTab === "your" 
                    ? "When you create Lists, they&apos;ll show up here."
                    : "When you follow Lists, they&apos;ll show up here."}
                </p>
                {activeTab === "your" && (
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                    Create a List
                  </button>
                )}
              </div>
            ) : (
              <div className="p-4">
                {/* Create List Button for Your Lists tab */}
                {activeTab === "your" && (
                  <div className="mb-6">
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                      ➕ Create a new List
                    </button>
                  </div>
                )}
                
                {/* Lists Grid */}
                <div className="space-y-4">
                  {currentLists.map((list) => (
                    <div
                      key={list.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                              {list.name}
                            </h3>
                            {list.isPrivate && (
                              <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                                🔒 Private
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {list.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{list.memberCount} members</span>
                            <span>Created {formatDate(list.createdAt)}</span>
                            {list.creator !== "you" && (
                              <span>by @{list.creator}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {activeTab === "your" ? (
                            <>
                              <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                                ✏️
                              </button>
                              <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                                🗑️
                              </button>
                            </>
                          ) : (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm">
                              Following
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Widgets />
        </main>
      </div>
    </div>
  );
};

export default Lists;
