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
export const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src={LOGO} alt="logo" width={30} height={30}></Image>
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <SideBarLink text="Home" Icon={HomeIcon}  active />
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
        <img className="h-10 w-10 rounded-full xl:mr-2.5" src={"https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667235600&t=c35915a8d34897267688ebc08bcf8c4c"} alt="" />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">cherry</h4>
          <p className="text-[#6e767d] text-sm">c_chenjunguang.163.com</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-1"/>
        </div>
    </div>
  )
}
