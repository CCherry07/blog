import { CalendarIcon, ChartBarIcon, FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useRef, useState } from "react"

interface InputProps{

}
export function Input() {
  const [input,setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef<HTMLInputElement>(null)
  function addImageToPost(e: ChangeEvent<HTMLInputElement>) {
    
  }
  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3`}>
      <img className="h-11 w-11 rounded-full cursor-pointer" 
          src={"https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667235600&t=c35915a8d34897267688ebc08bcf8c4c"} 
          alt="" />
      <div className="w-full divide-y divide-gray-700">
        <div className={``}>
          <textarea
            onChange={(e)=>setInput(e.target.value)}
            value={input} rows={2}
            placeholder="What's happening ?"
            className="w-full bg-transparent min-h-[50px]
                       outline-none text-[#d9d9d9] placeholder-gray-500 tracking-wide"></textarea>
          {selectedFile && (
            <div className="relative">
              <div className="absolute w-8 h-8 bg-[#15151c] hover:bg-[#272c26] 
                      flex items-center justify-center top-1 left-1 cursor-pointer
                      bg-opacity-75 rounded-full" onClick={() => setSelectedFile('')}>
                <div className="text-white h-5"></div>
              </div>
              <img src={selectedFile} className="rounded-2xl object-contain" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div onClick={()=>filePickerRef.current?.click()} className="icon">
              <PhotoIcon className="h-[22px] text-[#1d9bf0]"></PhotoIcon>
              <input type="file" accept="image/*" hidden 
                ref={filePickerRef}
                id="selectedImg" 
                onChange={addImageToPost}/>
            </div>
            
            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
          </div>

         
        </div>

      </div>
    </div>
  )
}

