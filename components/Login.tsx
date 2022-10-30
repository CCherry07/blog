import React from 'react'
import type { getProviders} from 'next-auth/react'
import {signIn , signOut} from 'next-auth/react'
import Image from 'next/image';
import Logo from '../assets/logo.svg';
interface LoginProps {
  providers: ReturnType<typeof getProviders>
}
function Login({providers}: LoginProps) {
  return (
    <div className='text-white flex flex-col items-center justify-center space-y-20 pt-40'>
      <Image src={Logo} width={150} height={50} alt="" className="object-contain" />
      <div>
        {Object.values(providers).map(provider=>{
          return <div key={provider.name}>
            <button className="relative inline-block text-lg group" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-[#1d9bf0] rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-60 h-60 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#1d9bf0]  group-hover:-rotate-180 ease"></span>
                  <span className="relative">
                    Sign in with {provider.name}
                  </span>
                </span>
              <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[#1d9bf0] rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
              </button>
          </div>
        }) }
      </div>
    </div>
  )
} 

export default Login
 