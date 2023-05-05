import { useState } from "react"
import type {MouseEvent} from 'react'
import { useRouter } from "next/router"
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import { useAuth } from "context/auth-context";
const RegisterForm = () => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await register({ username, password })
      router.push('/')
    } catch (err: any) {
      setErrors(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  const goLogin= (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/login')
  }
  return (
    <div className='text-white flex flex-col items-center justify-center space-y-20 pt-40'>
      <Image src={Logo} width={150} height={50} alt="" className="object-contain" />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 text-black w-56'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className='border-2 border-gray-300 rounded-md p-2 w-full'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className='border-2 border-gray-300 rounded-md p-2 w-full'
          />
          <div className="flex gap-4 justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className='bg-blue-500 text-white rounded-md p-2 w-1/2'
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <button
              className='border-2 border-dashed border-blue-500 text-white rounded-md p-2 w-1/2'
              onClick={goLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
