import React from 'react'
import Image from "next/image"
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

function Trending({ result }) {
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 font-light
            cursor-pointer transition ease-out flex justify-between items-center'>
      <div className='space-y-0.5'>
        <p className='text-[#6e767d] text-xs font-medium'>{result.heading}</p>
        <h6 className='font-bold max-w-[250px] text-sm'>{result.description}</h6>
        <p className='text-[#6e767d] text-xs font-medium max-w-[230px]'>Trending with {result?.tags?.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}</p>
      </div>
      {result.img ? (
        <Image
          src={result.img}
          width={70}
          height={70}
          alt=""
          className="rounded-2xl object-cover"
        />
      ) : (
        <div className="icon group">
          <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  )
}

Trending.propTypes = {}

export default Trending
