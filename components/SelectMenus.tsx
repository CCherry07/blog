import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import { useClickTargetOutsite } from 'hook/useClickTargetOutsite'

const solutions = [
  { name: 'logout', href: '/login', icon: ChartPieIcon },
  { name: 'register', href: '/register', icon: CursorArrowRaysIcon },
]
export default function SelectMenus() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const openModal = () => {
    setOpen(!open)
  }
  useClickTargetOutsite(ref, () => {
    if (!open) {
      return
    }
    setOpen(false)
  })
  return (
    <div ref={ref}>
      <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-1" onClick={openModal} />
      <div className='absolute left-full translate-y-[-3rem]'>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="left-1/2 z-10 mt-5 flex max-w-max -translate-y-1/2 px-4">
            <div className="max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {solutions.map((item) => (
                  <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50">
                    <div className="mt-1 flex h-3 w-3 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon className="h-3 w-3 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div>
                      <a href={item.href} className="font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
