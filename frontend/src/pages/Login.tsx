import React, { useState } from 'react'
import Register from './Register'
import { MdLock, MdPerson } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/SystemContext'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {
  const { setToken } = useData()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)

  const navigate = useNavigate()

  const handleRegToggle = () => {
    setRegister(true)
  }

  const successPop = (msg: any) => toast.success(msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })

  const errorPop = (msg: any) => toast.error(msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (username && password){
      axios.post('http://localhost:7000/login', { username, password })
        .then(response => {
          if (response.data.err){
            return errorPop(response.data.err)
          }
          setToken(response.data.token)
          navigate('/home')
        })
    } else {
      errorPop('Please fill up all input fields')
    }
  }

  return (
    <>
      <div className='h-[92vh] flex justify-center items-center'>
          <form onSubmit={handleLogin} className={(register ? 'mr-[350px] blur-sm' : '') + ' w-[360px] duration-300 shadow py-14 px-14 flex flex-col justify-center bg-[#262626] rounded'}>

              <div className='mb-2'>
                  <h1 className='text-center font-medium text-2xl'>Welcome back!</h1>
                  <p className='text-sm font-light text-center'>Ikaw. Nakatikim kana ba ng tag dalawang pisong takoyaki?</p> 
              </div>

              <div className='py-2 my-4'>
                <div className='flex flex-row items-center my-4 bg-white text-gray-800 rounded-sm shadow'>
                  <label htmlFor="username" className='text-xl px-1 border-r'><MdPerson /></label>
                  <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} id='username' placeholder='Username' className='outline-none w-full text-sm py-2 px-2' required />
                </div>
                <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                  <label htmlFor="password" className='text-xl px-1 border-r'><MdLock /></label>
                  <input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} id='password' placeholder='Password' className='outline-none w-full text-sm py-2 px-2' required />
                </div>
                <div className='flex flex-row justify-end'>
                  <Link to='/login' className='text-xs font-medium hover:text-blue-500 duration-200'>Forgot password?</Link>
                </div>
              </div>

              <div className=' flex flex-col'>
                  <button type='submit' className='w-full text-sm font-bold py-2 px-3 my-1 bg-blue-600 hover:bg-blue-500 duration-200 rounded-sm shadow'>Login</button>
                  <button type='button' onClick={handleRegToggle} className='text-xs hover:text-blue-500 text-center pt-1 duration-200'>I don't have an account</button>
              </div>

          </form>
          {
            register && <Register setRegister={setRegister} successPop={successPop} errorPop={errorPop} />
          }
      </div>
      <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
      />
    </>
  )
}

export default Login