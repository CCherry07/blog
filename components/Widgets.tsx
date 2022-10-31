import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Image from 'next/image';
import Trending from './Trending'
interface WidgetsProps {
  trendingResults: any
  followResults: any
}
function Widgets(props: WidgetsProps) {
  const { trendingResults, followResults } = props
  return (
    <div className='hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5'>
      <div className='sticky top-0 py-1.5 z-50 w-11/12 xl:w-9/12'>
        <div className='flex items-center bg-[#202327] p-3 rounded-full relative'>
          <MagnifyingGlassIcon className='text-gray-500 h-5 z-50' />
          <input type="text" className='placeholder-gray-500 bg-transparent outline-none 
              text-[#d9d9d9] focus:shadow-lg focus:bg-black focus:border-[#1d9bf0] rounded-full
              absolute inset-0 pl-11 border border-transparent w-full' placeholder='Search blog' />
        </div>
      </div>
      <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12'>
        <h4 className='font-bold text-xl px-4'> What&apos; s happening </h4>
        {
          trendingResults.map((result, index) => {
            return <Trending key={index} result={result} />
          })
        }
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 font-light
            cursor-pointer transition ease-out flex justify-between items-center w-full text-[#1d9bf0]'>Show more</button>
      </div>
      <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12'>
        <h4 className='font-bold text-xl px-4'>Who to follow </h4>
        {
          (followResults ?? []).map((result, index) => {
            return <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 font-light
            cursor-pointer transition ease-out flex items-center justify-between' key={index}>
              <Image
                src={result.userImg}
                width={50}
                height={50}
                alt=""
                className="rounded-full object-cover"
              />
              <div className='ml-4 leading-5 group'>
                <h4 className='font-bold group-hover:underline'>{result.username}</h4>
                <h5 className='text-gray-500 text-[15px]'>{result.tag}</h5>
              </div>
              <button className='ml-auto bg-white text-sm py-1.5 px-3.5
                 text-black rounded-full decoration-black'>Follow</button>
            </div>
          })
        }
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 font-light
            cursor-pointer transition ease-out flex justify-between items-center w-full text-[#1d9bf0]'>Show more</button>
      </div>
    </div>
  )
}

Widgets.propTypes = {}

export default Widgets
