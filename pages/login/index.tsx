import { useState } from "react"
import { useRouter } from "next/router"
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import { useAuth } from "context/auth-context";
const LoginForm = () => {
  const [username, setUsername] = useState('cherry')
  const [password, setPassword] = useState('cherry')
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login({ username, password })
      router.push('/')
    } catch (err: any) {
      setErrors(err.message)
    } finally {
      setIsSubmitting(false)
    }
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
            placeholder="Email"
            className='border-2 border-gray-300 rounded-md p-2 w-full'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className='border-2 border-gray-300 rounded-md p-2 w-full'
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className='bg-blue-500 text-white rounded-md p-2'
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
