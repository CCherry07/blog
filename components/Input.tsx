import { ChangeEvent, useRef, useState } from "react"
import { CalendarIcon, ChartBarIcon, FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline"
import data from '@emoji-mart/data'
// @ts-ignore
import Picker from '@emoji-mart/react'
import { useClickTargetOutsite } from "../hook/useClickTargetOutsite"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useMutation } from 'react-query'
import { useAuth } from "context/auth-context"
import { useAddUpdate } from "utils/posts"
import { client } from "utils/api-client"

interface Payload {
  id: number,
  username: string,
  userImg: string,
  tag: string,
  content: string,
  image: string | ArrayBuffer
}
export function Input() {
  const { user } = useAuth()
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer>("")
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef(null)
  const sendPost = async (data: Payload) => await client("/posts", { data })
  const { mutate, isLoading } = useMutation(sendPost, useAddUpdate('posts'))
  function addImageToPost(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      readerEvent.target?.result && setSelectedFile(readerEvent.target?.result)
    }
  }
  function addEmoji(e: any) {
    const { native, unified } = e
    // let sym = unified.split("-").map((el:string)=>("0x"+el))
    // const emoji = String.fromCodePoint(...sym)
    setInput(input + native)
  }

  useClickTargetOutsite(pickerRef, (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.getAttribute("name") === "emoji-trigger") return
    setShowEmojis(false)
  })

  function fetchPost() {
    if (!user) return
    const payload = {
      id: user.id,
      username: user.name,
      userImg: user.avatar,
      tag: user?.tag,
      content: input,
      image: selectedFile
    }
    mutate(payload, {
      onSuccess({ code }) {
        if (code === 0) {
          setSelectedFile('')
          setInput('')
          setShowEmojis(false)
        }
      }
    })
  }

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 ${isLoading && "opacity-60"}`}
      style={{ scrollbarWidth: "none" }}
    >
      <img className="h-11 w-11 rounded-full cursor-pointer"
        src={user?.avatar}
        alt={user?.name} />
      <div className="w-full divide-y divide-gray-700">
        <div className={``}>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input} rows={2}
            placeholder="What's happening ?"
            className="w-full bg-transparent min-h-[50px]
                       outline-none text-[#d9d9d9] placeholder-gray-500 tracking-wide"></textarea>
          {selectedFile && (
            <div className="relative">
              <div className="absolute w-8 h-8 bg-[#15151c] hover:bg-[#272c26] 
                      flex items-center justify-center top-1 left-1 cursor-pointer
                      bg-opacity-75 rounded-full" onClick={() => setSelectedFile('')}>
                <XMarkIcon className="text-white h-5" />
              </div>
              <img src={selectedFile as string} className="rounded-2xl object-contain" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div onClick={() => filePickerRef.current?.click()} className="icon">
              <PhotoIcon className="h-[22px] text-[#1d9bf0]"></PhotoIcon>
              <input type="file" accept="image/*" hidden
                ref={filePickerRef}
                id="selectedImg"
                onChange={addImageToPost} />
            </div>

            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon emoji-trigger" onClick={() => setShowEmojis(!showEmojis)}>
              <FaceSmileIcon titleId="xxx" name="emoji-trigger" className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
          </div>

          {showEmojis && (
            <div
              ref={pickerRef}
              style={{
                position: "absolute",
                marginTop: "465px",
                marginLeft: -40,
                maxWidth: "320px",
                borderRadius: "20px"
              }}>
              <Picker
                theme="dark"
                onEmojiSelect={addEmoji}
                data={data}></Picker>
            </div>
          )}
          <button className="text-[#d9d9d9] text-md font-bold hidden ml-auto w-20 h-[32px] rounded-full bg-[#1d9bf0] 
        shadow-md hover:bg-[#1a8cd8] xl:inline items-center justify-center disabled:opacity-50 disabled:cursor-default"
            onClick={fetchPost}
            disabled={!input.trim() && !selectedFile}>Tweet</button>
        </div>

      </div>
    </div>
  )
}

