import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { auth } from "../firebase/firebase";

const Notifications = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      user: "john_doe",
      content: "liked your tweet about Next.js",
      time: "2h",
      read: false,
    },
    {
      id: 2,
      type: "retweet",
      user: "jane_smith",
      content: "retweeted your post",
      time: "4h",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      user: "dev_community",
      content: "started following you",
      time: "1d",
      read: true,
    },
    {
      id: 4,
      type: "mention",
      user: "tech_guru",
      content: "mentioned you in a tweet",
      time: "2d",
      read: true,
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return "❤️";
      case "retweet":
        return "🔄";
      case "follow":
        return "👤";
      case "mention":
        return "💬";
      default:
        return "🔔";
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="dark:bg-[#15202b] h-screen overflow-hidden"
    >
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Notifications - Twitter 2.0</title>
          <meta name="description" content="Stay updated with your notifications" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
            <div className="sticky top-0 bg-white dark:bg-[#15202b] p-4 border-b dark:border-gray-800">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Notifications
              </h1>
            </div>
            
            {!user ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to view your notifications.
                </p>
              </div>
            ) : (
              <div className="divide-y dark:divide-gray-800">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-800 dark:text-white">
                            @{notification.user}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {notification.content}
                          </span>
                          <span className="text-sm text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {notifications.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4">🔔</div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      No notifications yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      When you get notifications, they&apos;ll show up here.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Widgets />
        </main>
      </div>
    </motion.div>
  );
};

export default Notifications;
