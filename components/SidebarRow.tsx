import { useRouter } from "next/router";
import React, { SVGProps } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/firebase";

interface Props {
  Icon: any;
  title: string;
  isShow?: boolean;
  onClick?: () => void;
}

function SidebarRow({ Icon, title, isShow, onClick }: Props) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleSignIn = () => {
    if (user) {
      router.push("/");
    } else {
      router.push("/auth/signin");
    }
  };

  const handleClick = () => {
    if (title === "Sign Out") {
      handleSignOut();
    } else if (title === "Sign In") {
      handleSignIn();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {isShow ? (
        <div
          onClick={handleClick}
          className="group flex max-w-fit  bg-blue-100
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3
      transition-all duration-200 hover:bg-blue-200 dark:bg-gray-600 mb-1 mt-1"
        >
          <Icon className="h-6 w-6 " />
          <p className="hidden group-hover:text-twitter md:inline-flex text-base font-light">
            {title}
          </p>
        </div>
      ) : (
        <div
          onClick={title === "Sign Out" ? handleSignOut : title === "Sign In" ? handleSignIn : handleClick}
          className={
            title === "Sign In"
              ? `group flex max-w-fit 
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3
      transition-all duration-200 animate-pulse text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-600 dark:text-blue-300`
              : `group flex max-w-fit 
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3
      transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600`
          }
        >
          <Icon className="h-6 w-6 " />
          <p className="hidden group-hover:text-twitter md:inline-flex text-base font-light">
            {title}
          </p>
        </div>
      )}
    </>
  );
}

export default SidebarRow;
