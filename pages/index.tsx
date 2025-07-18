import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { groq } from "next-sanity";

import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { Tweet } from "../typings";
import { sanityClient } from "../sanity";

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  return (
    <div
      className="dark:bg-[#15202b] h-screen overflow-hidden"
    >
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Cardinal&trade;</title>
          <meta name="description" content="Cardinal – Share your thoughts, follow voices, and join real-time discussions." />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <Toaster />
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={true} />
          <Feed tweets={tweets} />
          <Widgets />
        </main>
      </div>
    </div>
  );
};

export default Home;

const feedQuery = groq`
*[_type == "tweet" && !blockTweet] {
	_id,
  _createdAt,
  _updatedAt,
  _rev,
  _type,
  blockTweet,
  text,
  username,
  profileImg,
  image
} | order(_createdAt desc)
`;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery);

    return {
      props: {
        tweets,
      },
    };
  } catch (error) {
    console.error('Error fetching tweets in getServerSideProps:', error);
    return {
      props: {
        tweets: [],
      },
    };
  }
};
