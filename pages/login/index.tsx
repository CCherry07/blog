import { useRef, useState } from "react"
import type { MouseEvent } from 'react'
import { useRouter } from "next/router"
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import { useAuth } from "context/auth-context";
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>()
  const router = useRouter()
  const action = useRef('login')
  const handleSubmit = async () => {
    const payload = { username, password }
    if (!username || !password) {
      return
    }
    setIsSubmitting(true)
    try {
      action.current === 'login' ? await login(payload) : await register(payload)
      router.push('/')
    } catch (err: any) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  const reset = () => {
    setErrors('')
    setUsername('')
    setPassword('')
  }
  const goLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
    action.current = 'login'
    handleSubmit()
  }
  const goRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
    action.current = 'register'
    handleSubmit()
  }
  return (
    <div className='text-white flex flex-col items-center justify-center space-y-20 pt-40'>
      <Image src={Logo} width={150} height={50} alt="" className="object-contain" />
      <div>
        <div className='text-end text-[#D63A5F] text-sm pb-1'>{errors?.msg}</div>
        <form className='flex flex-col space-y-4 text-black w-56'>
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
              onClick={goLogin}
              disabled={isSubmitting}
              className='bg-blue-500 text-white rounded-md p-2 w-1/2'
            >
              {action.current === 'login' && isSubmitting ? 'Logging...' : 'Login'}
            </button>
            <button
              onClick={goRegister}
              className='border-2 border-dashed border-blue-500 text-white rounded-md p-2 w-1/2'
            >
              {action.current === 'register' && isSubmitting ? 'Register...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
