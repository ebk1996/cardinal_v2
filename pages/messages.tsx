import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { auth } from "../firebase/firebase";

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  avatar: string;
  unread: boolean;
}

interface Conversation {
  id: number;
  user: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const Messages = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      user: "John Doe",
      avatar: "👨‍💻",
      lastMessage: "Hey! How&apos;s the project going?",
      time: "2m",
      unread: 2,
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "👩‍💼",
      lastMessage: "Thanks for the help with the code!",
      time: "1h",
      unread: 0,
    },
    {
      id: 3,
      user: "Dev Community",
      avatar: "🚀",
      lastMessage: "New updates available in our Discord",
      time: "3h",
      unread: 1,
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "John Doe",
      content: "Hey! How are you doing?",
      time: "10:30 AM",
      avatar: "👨‍💻",
      unread: false,
    },
    {
      id: 2,
      sender: "You",
      content: "I&apos;m doing great! Working on the Twitter clone project.",
      time: "10:32 AM",
      avatar: "👤",
      unread: false,
    },
    {
      id: 3,
      sender: "John Doe",
      content: "That sounds awesome! How&apos;s the progress?",
      time: "10:35 AM",
      avatar: "👨‍💻",
      unread: true,
    },
  ]);

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
          <title>Messages - Cardinal&trade;</title>
          <meta name="description" content="Your direct messages and conversations" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 lg:col-span-5 border-x dark:border-gray-800 max-h-screen">
            {!user ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Welcome to your inbox!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to send and receive direct messages.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 h-screen">
                {/* Conversations List */}
                <div className="col-span-1 border-r dark:border-gray-800 overflow-y-auto">
                  <div className="sticky top-0 bg-white dark:bg-[#15202b] p-4 border-b dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                      Messages
                    </h2>
                  </div>
                  <div className="divide-y dark:divide-gray-800">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{conversation.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-800 dark:text-white truncate">
                                {conversation.user}
                              </p>
                              <span className="text-sm text-gray-500">
                                {conversation.time}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                {conversation.lastMessage}
                              </p>
                              {conversation.unread > 0 && (
                                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                                  {conversation.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="col-span-2 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Message Header */}
                      <div className="p-4 border-b dark:border-gray-800 bg-white dark:bg-[#15202b]">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {conversations.find(c => c.id === selectedConversation)?.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {conversations.find(c => c.id === selectedConversation)?.user}
                            </h3>
                            <p className="text-sm text-gray-500">Active now</p>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "You" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender === "You"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === "You" ? "text-blue-100" : "text-gray-500"
                              }`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t dark:border-gray-800 bg-white dark:bg-[#15202b]">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Start a new message..."
                            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-full 
                                     bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                            ➤
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Select a message
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Choose from your existing conversations or start a new one.
                        </p>
                      </div>
                    </div>
                  )}
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

export default Messages;
