import React from "react";
import { useRouter } from "next/router";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserIcon as UserSecond } from "@heroicons/react/solid";

import SidebarRow from "./SidebarRow";
import { auth } from "../firebase/firebase";
import DarkSwitch from "./DarkSwitch";

type SideBarProps = {
  isShow: boolean;
  isHome: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ isShow, isHome }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // Navigation handlers for each sidebar item
  const handleHomeClick = () => router.push("/");
  const handleExploreClick = () => router.push("/explore");
  const handleNotificationsClick = () => router.push("/notifications");
  const handleMessagesClick = () => router.push("/messages");
  const handleBookmarksClick = () => router.push("/bookmarks");
  const handleListsClick = () => router.push("/lists");
  const handleProfileClick = () => {
    if (user) {
      router.push("/profile");
    }
  };
  const handleMoreClick = () => console.log("More clicked - implement more options");

  return (
    <div className="col-span-2 flex flex-col item-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
        alt="Logo"
      />
      <SidebarRow Icon={HomeIcon} title="Home" isShow={isHome} onClick={handleHomeClick} />
      <SidebarRow Icon={HashtagIcon} title="Explore" onClick={handleExploreClick} />
      <SidebarRow Icon={BellIcon} title="Notifications" onClick={handleNotificationsClick} />
      <SidebarRow Icon={MailIcon} title="Messages" onClick={handleMessagesClick} />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" onClick={handleBookmarksClick} />
      <SidebarRow Icon={CollectionIcon} title="Lists" onClick={handleListsClick} />
      {isShow ? (
        <SidebarRow
          Icon={user ? UserIcon : UserSecond}
          title="Profile"
          isShow={isShow}
          onClick={handleProfileClick}
        />
      ) : (
        <SidebarRow
          Icon={user ? UserIcon : UserSecond}
          title={user ? "Sign Out" : "Sign In"}
          isShow={false}
        />
      )}
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" onClick={handleMoreClick} />
      <DarkSwitch />
    </div>
  );
};
export default SideBar;
