import { SparklesIcon } from "@heroicons/react/24/solid";
import { Input } from "./Input";

interface FeedProps {

}

export function Feed(props: FeedProps) {
  return (
    <div className="flex-grow text-black dark:text-white border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="dark:text-[#d9d9d9] flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-700"> 
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center 
                        justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-black dark:text-white" />
        </div>
       </div>
       <Input/>
    </div>
  )
}  
