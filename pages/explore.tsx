import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";

interface TrendingTopic {
  id: number;
  hashtag: string;
  tweets: number;
  category: string;
}

interface TrendingUser {
  id: number;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  followers: string;
}

const Explore = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"foryou" | "trending" | "news" | "sports">("foryou");
  const [searchQuery, setSearchQuery] = useState("");

  const [trendingTopics] = useState<TrendingTopic[]>([
    { id: 1, hashtag: "#ClimateAction", tweets: 89420, category: "News" },
    { id: 2, hashtag: "#Olympics2024", tweets: 156750, category: "Sports" },
    { id: 3, hashtag: "#AIRevolution", tweets: 67830, category: "Technology" },
    { id: 4, hashtag: "#WorldNews", tweets: 234120, category: "News" },
    { id: 5, hashtag: "#SpaceX", tweets: 78340, category: "Science" },
  ]);

  const [suggestedUsers] = useState<TrendingUser[]>([
    {
      id: 1,
      username: "elonmusk",
      displayName: "Elon Musk",
      avatar: "🚀",
      verified: true,
      followers: "150M",
    },
    {
      id: 2,
      username: "TheRock",
      displayName: "Dwayne Johnson",
      avatar: "🪨",
      verified: true,
      followers: "89M",
    },
    {
      id: 3,
      username: "Oprah",
      displayName: "Oprah Winfrey",
      avatar: "👑",
      verified: true,
      followers: "45M",
    },
    {
      id: 4,
      username: "BBCBreaking",
      displayName: "BBC Breaking News",
      avatar: "📺",
      verified: true,
      followers: "62M",
    },
    {
      id: 5,
      username: "NASA",
      displayName: "NASA",
      avatar: "🛸",
      verified: true,
      followers: "56M",
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }
  return (
    <div className="dark:bg-[#15202b] h-screen overflow-hidden">
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Explore - Cardinal&trade;</title>
          <meta name="description" content="Explore trending topics and discover new content" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
            {/* Header with Search */}
            <div className="sticky top-0 bg-white dark:bg-[#15202b] p-4 border-b dark:border-gray-800 z-10">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Explore
                </h1>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search Twitter"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent 
                           rounded-full text-gray-800 dark:text-white placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tabs */}
              <div className="flex space-x-8 mt-4">
                {["foryou", "trending", "news", "sports"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-2 px-1 border-b-2 transition-colors capitalize ${
                      activeTab === tab
                        ? "border-blue-500 text-gray-800 dark:text-white font-semibold"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    {tab === "foryou" ? "For you" : tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              {activeTab === "foryou" && (
                <div className="space-y-6">
                  {/* Trending Topics */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">🔥 Trending Topics</h3>
                    <div className="space-y-3">
                      {trendingTopics.slice(0, 3).map((topic) => (
                        <div key={topic.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-blue-500 hover:underline cursor-pointer">
                              {topic.hashtag}
                            </p>
                            <p className="text-sm text-gray-500">{formatNumber(topic.tweets)} Tweets</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">⋯</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Who to Follow */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">👥 Who to follow</h3>
                    <div className="space-y-3">
                      {suggestedUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-lg">
                              {user.avatar}
                            </div>
                            <div>
                              <div className="flex items-center space-x-1">
                                <p className="font-semibold text-gray-800 dark:text-white">
                                  {user.displayName}
                                </p>
                                {user.verified && <span className="text-blue-500">✓</span>}
                              </div>
                              <p className="text-sm text-gray-500">@{user.username}</p>
                              <p className="text-xs text-gray-400">{user.followers} followers</p>
                            </div>
                          </div>
                          <button className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-colors text-sm">
                            Follow
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "trending" && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4">Trending for you</h3>
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{index + 1} · {topic.category} · Trending</p>
                          <p className="font-bold text-gray-800 dark:text-white">{topic.hashtag}</p>
                          <p className="text-sm text-gray-500">{formatNumber(topic.tweets)} Tweets</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">⋯</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(activeTab === "news" || activeTab === "sports") && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {activeTab === "news" ? "News" : "Sports"} coming soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We&apos;re working on bringing you the latest {activeTab} updates.
                  </p>
                </div>
              )}
            </div>
          </div>
          <Widgets />
        </main>
      </div>
    </div>
  );
};

export default Explore;
