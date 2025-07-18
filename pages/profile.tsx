import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { auth } from "../firebase/firebase";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"tweets" | "replies" | "media" | "likes">("tweets");

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
          <title>Profile - Cardinal&trade;</title>
          <meta name="description" content="Your Twitter profile" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
            {!user ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Your Profile
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to view your profile.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-[#15202b] p-4 border-b dark:border-gray-800 z-10">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                      ←
                    </button>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                        {user.displayName || "User"}
                      </h1>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        0 Tweets
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cover Photo */}
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                  {/* Profile Picture */}
                  <div className="absolute -bottom-16 left-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 overflow-hidden">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600">
                          👤
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="px-4 pt-20 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {user.displayName || "User"}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        @{user.email?.split("@")[0] || "user"}
                      </p>
                    </div>
                    <button className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold">
                      Edit profile
                    </button>
                  </div>

                  <p className="text-gray-800 dark:text-white mb-4">
                    Building amazing things with code! 🚀 Passionate about web development, React, and creating user-friendly experiences.
                  </p>

                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <span>📍</span>
                      <span>Earth</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🗓️</span>
                      <span>Joined January 2024</span>
                    </div>
                  </div>

                  <div className="flex space-x-6 text-sm">
                    <div>
                      <span className="font-bold text-gray-800 dark:text-white">0</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-1">Following</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 dark:text-white">0</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-1">Followers</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b dark:border-gray-800">
                  <div className="flex">
                    {["tweets", "replies", "media", "likes"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-4 px-1 text-center capitalize transition-colors ${
                          activeTab === tab
                            ? "border-b-2 border-blue-500 text-gray-800 dark:text-white font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">
                    {activeTab === "tweets" && "🐦"}
                    {activeTab === "replies" && "💬"}
                    {activeTab === "media" && "📷"}
                    {activeTab === "likes" && "❤️"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {activeTab === "tweets" && "No Tweets yet"}
                    {activeTab === "replies" && "No replies yet"}
                    {activeTab === "media" && "No media yet"}
                    {activeTab === "likes" && "No likes yet"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {activeTab === "tweets" && "When you post a Tweet, it will show up here."}
                    {activeTab === "replies" && "When you reply to Tweets, they will show up here."}
                    {activeTab === "media" && "When you post photos or videos, they will show up here."}
                    {activeTab === "likes" && "When you like Tweets, they will show up here."}
                  </p>
                </div>
              </>
            )}
          </div>
          <Widgets />
        </main>
      </div>
    </div>
  );
};

export default Profile;
