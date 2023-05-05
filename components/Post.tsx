import { ChartBarIcon, ChatBubbleLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ArrowsRightLeftIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Moment from 'react-moment'
import { useSetRecoilState } from 'recoil';
import { modalState, postIdState } from '../atoms/midalAtom'
import { useAuth } from 'context/auth-context';
import type { Post } from 'pages/api/baseData';
import { useQueryClient, useMutation } from 'react-query';
interface PostProps {
  key: string | number
  id: number | string
  post: any,
  postPage?: any
}
function Post(props: PostProps) {
  const { post, id, postPage } = props
  const { mutate } = useMutation((id: number) => {
    return fetch(`/api/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })
  const queryClient = useQueryClient()
  const setIsOpen = useSetRecoilState(modalState)
  const setPostId = useSetRecoilState(postIdState);
  const { user } = useAuth()
  const [comments,] = useState([])
  const [likeNum, setLikeLikeNum] = useState<any>(post?.like)
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  function handleCardClick() {
    router.push(`/${id}`)
  }
  function likePost(id: number) {
    if (!liked) {
      setLikeLikeNum(likeNum + 1)
      setLiked(true)
    } else {
      setLikeLikeNum(likeNum - 1)
      setLiked(false)
    }
  }

  function delPost(id: number) {
    mutate(id)
  }
  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700' onClick={handleCardClick}>
      {!postPage && <img src={post?.userImg} alt="logo" className='h-11 w-11 rounded-full mr-4' />}
      <div className='flex flex-col space-y-2 w-full'>
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img src={post?.userImg} className="h-11 w-11 rounded-full mr-4" />
          )}
          <div className='text-[#6e767d]'>
            <div className='inline-block group'>
              <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
              <span className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}>@{post?.tag}</span>
            </div>
            .{" "}
            <span className='hover:underline text-sm sm:text-[15px]'>
              <Moment fromNow>{post?.timestamp}</Moment>
            </span>
            {
              !postPage && <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                {post?.content}
              </p>
            }
          </div>
          <div className='icon group flex-shrink-0 ml-auto'>
            <EllipsisHorizontalIcon className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]'></EllipsisHorizontalIcon>
          </div>
        </div>
        {postPage && (
          <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
            {post?.content}
          </p>
        )}
        <img src={post?.image} alt="" className='rounded-2xl max-h-[700px] object-cover mr-2' />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${postPage && "mx-auto"}`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id as string);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleLeftEllipsisIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {user?.id === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                // deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10" onClick={() => delPost(post.id)}>
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <ArrowsRightLeftIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost(post.id);
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIcon className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likeNum > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"}`}
              >
                {likeNum}
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
export default Post
