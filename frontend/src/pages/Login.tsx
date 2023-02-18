import React, { useState } from 'react'
import Register from './Register'
import { MdLock, MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface NotifInterface {
  msg: string,
  err: string
}

const Login = () => {
  const [register, setRegister] = useState(false)
  const [notif, setNotif] = useState<NotifInterface>({ msg: '', err: ''})

  const handleRegToggle = () => {
    setRegister(!register)
  }

  return (
    <div className='h-[92vh] flex justify-center items-center'>
        <form className={(register ? 'mr-[350px] blur-sm' : '') + ' w-[360px] duration-300 shadow py-14 px-14 flex flex-col justify-center bg-[#262626] rounded'}>

            <div className='mb-2'>
              {/* <img src="/h.png" className='pb-3 mx-auto w-[80px] objecy-contain' alt="" /> */}
                <h1 className='text-center font-medium text-2xl'>Welcome back!</h1>
                <p className='text-sm font-light text-center'>Ikaw. Nakatikim kana ba ng tag dalawang pisong takoyaki?</p> 
            </div>

            <div className='py-2 my-4'>
              <div className='flex flex-row items-center my-4 bg-white text-gray-800 rounded-sm shadow'>
                <label htmlFor="username" className='text-xl px-1 border-r'><MdPerson /></label>
                <input type="text" id='username' placeholder='Username' className='outline-none w-full text-sm py-2 px-2' required />
              </div>
              <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                <label htmlFor="password" className='text-xl px-1 border-r'><MdLock /></label>
                <input type="password" id='password' placeholder='Password' className='outline-none w-full text-sm py-2 px-2' required />
              </div>
              <div className='flex flex-row items-center gap-2 justify-between'>
                <div className='text-xs'>
                  {
                    notif.err ? (
                      <p className='font-bold text-red-500'>{notif.err}</p>
                    ) : null
                  }
                </div>
                <Link to='/login' className='text-xs font-medium hover:text-blue-300 duration-200'>Forgot password?</Link>
              </div>
            </div>

            <div className=' flex flex-col'>
                <button type='submit' className='w-full text-sm font-bold py-2 px-3 my-1 bg-blue-600 hover:bg-blue-500 duration-200 rounded-sm shadow'>Login</button>
                <button type='button' onClick={handleRegToggle} className='text-xs hover:text-blue-300 text-center pt-1 duration-200'>I don't have an account</button>
            </div>

        </form>
        {
          register && <Register register={register} setRegister={setRegister} />
        }
    </div>
  )
}

export default Login