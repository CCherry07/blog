import { SparklesIcon } from "@heroicons/react/24/solid";
import { useQuery } from 'react-query'
import { Input } from "./Input";
import Post from "./Post";
import type { Data } from '../pages/api/posts'
interface FeedProps {

}

export function Feed(props: FeedProps) {
  const {
    data: posts = []
  } = useQuery<Data['data']>('posts', async () => {
    const res = await fetch('/api/posts', {
      method: 'GET',
    })
    return (await res.json() as unknown as Data).data
  })
  

  return (
    <div className="flex-grow text-black dark:text-white border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="dark:text-[#d9d9d9] flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center 
                        justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-black dark:text-white" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {
          posts.map(post => {
            return <Post key={post.id} id={post.id} post={post}></Post>
          })
        }
      </div>
    </div>
  )
}  
