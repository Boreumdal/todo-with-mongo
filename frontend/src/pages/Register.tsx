import React, { useState } from 'react'
import axios from 'axios'
import { MdLock, MdPerson, MdEmail } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css';

type RegProps = {
    setRegister: (value: boolean) => void
    successPop: (value: any) => void
    errorPop: (value: any) => void
}

const Register = ({ setRegister, successPop, errorPop }: RegProps) => {

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleRegToggle = () => {
        setRegister(false)
    }



    const handleRegisterUser = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (username && email && password){
            axios.post('http://localhost:7000/register', { username, email,  password })
            .then(response => {
                if (response.data.err) {
                    errorPop(response.data.err)
                }
                if (response.data.msg) {
                    successPop(response.data.msg)
                    handleRegToggle()
                }
            })
        } else {
            errorPop('Please fill up all input fields')
        }
    }

  return (
    <>
        <div className='duration-300 absolute top-0 left-0 w-full h-full bg-overlay z-10' onDoubleClick={handleRegToggle}></div>
        <div className='-rotate-90 mr-3 absolute z-20 text-sm text-gray-300 font-medium tracking-wide'>Double tap outside the box to exit registration</div>
        <div className='absolute ml-[370px] duration-300 z-20'>
            <form onSubmit={handleRegisterUser} className='w-[360px] shadow py-14 px-14 flex flex-col justify-center bg-[#262626] rounded'>

                <div className='mb-2'>
                    <h1 className='text-left font-medium text-2xl'>Registration</h1>
                    <p className='text-sm font-light text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.</p> 
                </div>

                <div className='pt-2 mt-3 flex flex-col'>
                    <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                        <label htmlFor="username" className='text-xl px-1 border-r'><MdPerson /></label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} value={username} type="text" id='username' placeholder='Username' className='outline-none w-full text-sm py-2 px-2' required />
                    </div>
                    <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                        <label htmlFor="email" className='text-xl px-1 border-r'><MdEmail /></label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} value={email} type="email" id='email' placeholder='Email' className='outline-none w-full text-sm py-2 px-2' required />
                    </div>
                    <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                        <label htmlFor="password" className='text-xl px-1 border-r'><MdLock /></label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password} type="password" id='password' placeholder='Password' className='outline-none w-full text-sm py-2 px-2' required />
                    </div>
                </div>

                <div className='flex flex-col mt-1'>
                    <button type='submit' className='w-full text-sm font-bold py-2 px-3 my-1 bg-blue-600 hover:bg-blue-500 duration-200 rounded-sm shadow'>Register</button>
                    <button type='button' onClick={handleRegToggle} className='text-xs hover:text-blue-500 text-center pt-1 duration-200'>I already have an account</button>
                </div>

            </form>
        </div>
    </>
  )
}

export default Register