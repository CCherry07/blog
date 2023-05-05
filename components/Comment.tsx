import React, { useEffect, useState } from 'react'
import Moment from "react-moment";
import {
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from 'next/router';
interface CommentProps {
  key: string,
  id: string,
  comment: any
}
function Comment(props: CommentProps) {
  const { comment, id } = props
  const router = useRouter()
  const [likes, setLikes] = useState<any>([])
  const [liked, setLiked] = useState(false)
  async function likePost() {
    setLikes([...likes, comment.id])
    setLiked(true)
  }

  useEffect(() => {
    // setLiked(likes.findIndex((like: any) => like?.id === session.user.uid) !== -1)
  }, [likes])
  const sendComment = async (e: any) => {
    e.preventDefault();

    // setIsOpen(false);
    // setComment("");
    router.push(`/${comment.id}`);
  };
  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700'>
      <img src={comment?.userImg} alt="" className='h-11 w-11 rounded-full mr-4' />
      <div className='flex flex-col space-y-2 w-full'>
        <div className='text-[#6e767d]'>
          <div className='inline-block group'>
            <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline inline-block`}>{comment?.username}</h4>
            <span className={`ml-1.5 text-sm sm:text-[15px]`}>@{comment?.tag}</span>
          </div>
          {" "}.{" "}
          <span className='hover:underline text-sm sm:text-[15px]'>
            <Moment fromNow>{comment?.timestamp}</Moment>
          </span>
          <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
            {comment?.content}
          </p>
        </div>
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 mx-auto}`}
        >
          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleLeftEllipsisIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIcon className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                  }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Comment
