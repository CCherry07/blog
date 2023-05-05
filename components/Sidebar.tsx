import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import LOGO from '../assets/logo.svg'
import { SideBarLink } from "./SideBarLink"
import Image from 'next/image'
import { useAuth } from "context/auth-context";
import SelectMenus from "./SelectMenus";
import { useRef, useState } from "react";
import { useClickTargetOutsite } from "hook/useClickTargetOutsite";

export const Sidebar = () => {
  const { user } = useAuth()

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src={LOGO} alt="logo" width={30} height={30}></Image>
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <SideBarLink text="Home" Icon={HomeIcon} active />
        <SideBarLink text="Explore" Icon={HashtagIcon} />
        <SideBarLink text="Notifications" Icon={BellIcon} />
        <SideBarLink text="Messages" Icon={InboxIcon} />
        <SideBarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SideBarLink text="Lists" Icon={ClipboardDocumentListIcon} />
        <SideBarLink text="Profile" Icon={UserIcon} />
        <SideBarLink text="More" Icon={EllipsisHorizontalIcon} />
      </div>
      <button className="text-[#d9d9d9] text-lg font-bold hidden ml-auto w-56 h-[52px] rounded-full bg-[#1d9bf0] 
        shadow-md hover:bg-[#1a8cd8] xl:inline items-center justify-center ">Tweet</button>
      <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto">
        <img className="h-10 w-10 rounded-full xl:mr-2.5" src={user?.avatar} alt={user?.name} />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{user?.name}</h4>
          <p className="text-[#6e767d] text-sm">{user?.email}</p>
        </div>
        <SelectMenus/>
      </div>
    </div>
  )
}
