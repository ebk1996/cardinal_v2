import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function Widgets() {
  const [mounted, setMounted] = useState(false);
  const [fakeData, setFakeData] = useState({
    country: "Trending",
    avatars: ["", ""],
    names: ["User", "User", "User", "User"],
  });

  // Generate fake data only on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setFakeData({
      country: faker.address.country(),
      avatars: [faker.image.avatar(), faker.image.avatar()],
      names: [
        faker.name.firstName(),
        faker.name.firstName(),
        faker.name.firstName(),
        faker.name.firstName(),
      ],
    });
  }, []);
  return (
    <div style={{ maxWidth: "350px" }}>
      <div className="overflow-y-auto fixed h-screen scrollbar-hide">
        <div className="relative text-gray-800 w-80 p-5 dark:text-gray-500">
          <button type="submit" className="absolute ml-4 mt-3 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>

          <input
            type="search"
            name="search"
            placeholder="Search Twitter"
            className="bg-dim-700 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        <div className="max-w-sm rounded-lg bg-dim-700 overflow-hidden m-4 hover:shadow-md">
          <div className="flex">
            <div className="flex-1 m-2">
              <h2 className="px-4 py-2 text-xl w-48 font-semibold text-gray-700 dark:text-gray-200">
                {mounted ? fakeData.country : "Trending"} trends
              </h2>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a
                href=""
                className="text-2xl rounded-full text-gray-800 hover:text-blue-300 float-right dark:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <hr className="border-gray-800" />

          <div className="flex">
            <div className="flex-1">
              <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-500 dark:text-gray-400">
                1 . News . Trending
              </p>
              <h2 className="px-4 ml-2 w-48 font-bold text-gray-500 dark:text-gray-200">
                #ClimateAction
              </h2>
              <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-500 dark:text-gray-400">
                89.4K Tweets
              </p>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a
                href=""
                className="text-2xl rounded-full text-gray-400 hover:text-blue-300 float-right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </div>
          </div>
          <hr className="border-gray-800" />

          <div className="flex">
            <div className="flex-1">
              <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-500 dark:text-gray-400">
                2 . Sports . Trending
              </p>
              <h2 className="px-4 ml-2 w-48 font-bold text-gray-500 dark:text-gray-200">
                #Olympics2024
              </h2>
              <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-500 dark:text-gray-400">
                156K Tweets
              </p>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a
                href=""
                className="text-2xl rounded-full text-gray-400 hover:text-blue-300 float-right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </div>
          </div>
          <hr className="border-gray-800" />

          <div className="flex">
            <div className="flex-1">
              <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-500 dark:text-gray-400">
                3 . Technology . Trending
              </p>
              <h2 className="px-4 ml-2 w-48 font-bold text-gray-500 dark:text-gray-200">
                #AIRevolution
              </h2>
              <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-500 dark:text-gray-400">
                67.8K Tweets
              </p>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a
                href=""
                className="text-2xl rounded-full text-gray-400  hover:text-blue-300 float-right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </div>
          </div>
          <hr className="border-gray-800" />

          <div className="flex">
            <div className="flex-1 p-4">
              <h2 className="px-4 ml-2 w-48 font-bold text-blue-400 cursor-pointer">
                Show more
              </h2>
            </div>
          </div>
        </div>

        <div className="max-w-sm rounded-lg bg-dim-700 overflow-hidden m-4 hover:shadow-md">
          <div className="flex">
            <div className="flex-1 m-2">
              <h2 className="px-4 py-2 text-xl w-48 font-semibold text-gray-800 dark:text-gray-200">
                Who to follow
              </h2>
            </div>
          </div>

          <hr className="border-gray-800" />

          <div className="flex flex-shrink-0">
            <div className="flex-1">
              <div className="flex items-center w-48">
                <div>
                  <div className="h-10 w-10 rounded-full ml-4 mt-2 bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🚀</span>
                  </div>
                </div>
                <div className="ml-3 mt-3">
                  <p className="text-base leading-6 font-medium text-gray-700 dark:text-gray-200">
                    Elon Musk ✓
                  </p>
                  <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    @elonmusk
                  </p>
                  <p className="text-xs text-gray-400">150M followers</p>
                </div>
              </div>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a href="" className="float-right">
                <button className="bg-transparent hover:bg-gray-600 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded-full dark:text-gray-300">
                  Follow
                </button>
              </a>
            </div>
          </div>
          <hr className="border-gray-800" />

          <div className="flex flex-shrink-0">
            <div className="flex-1">
              <div className="flex items-center w-48">
                <div>
                  <div className="h-10 w-10 rounded-full ml-4 mt-2 bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🪨</span>
                  </div>
                </div>
                <div className="ml-3 mt-3">
                  <p className="text-base leading-6 font-medium text-gray-800 dark:text-gray-200">
                    Dwayne Johnson ✓
                  </p>
                  <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    @TheRock
                  </p>
                  <p className="text-xs text-gray-400">89M followers</p>
                </div>
              </div>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a href="" className="float-right">
                <button className="bg-transparent hover:bg-gray-600 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded-full dark:text-gray-300">
                  Follow
                </button>
              </a>
            </div>
          </div>

          <hr className="border-gray-800" />

          <div className="flex flex-shrink-0">
            <div className="flex-1">
              <div className="flex items-center w-48">
                <div>
                  <div className="h-10 w-10 rounded-full ml-4 mt-2 bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">👑</span>
                  </div>
                </div>
                <div className="ml-3 mt-3">
                  <p className="text-base leading-6 font-medium text-gray-800 dark:text-gray-200">
                    Oprah Winfrey ✓
                  </p>
                  <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    @Oprah
                  </p>
                  <p className="text-xs text-gray-400">45M followers</p>
                </div>
              </div>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <a href="" className="float-right">
                <button className="bg-transparent hover:bg-gray-600 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded-full dark:text-gray-300">
                  Follow
                </button>
              </a>
            </div>
          </div>

          <hr className="border-gray-800" />

          <div className="flex">
            <div className="flex-1 p-4">
              <h2 className="px-4 ml-2 w-48 font-bold text-blue-400 cursor-pointer">
                Show more
              </h2>
            </div>
          </div>
        </div>

        <div className="flow-root m-6">
          <div className="flex-1">
            <a href="#">
              <p className="text-sm leading-6 font-medium text-gray-500 dark:text-gray-300">
                Terms Privacy Policy Cookies Imprint Ads info
              </p>
            </a>
          </div>
          <div className="flex-2">
            <p className="text-sm leading-6 font-medium text-gray-600 dark:text-gray-400">
              © 2020 Twitter, Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
