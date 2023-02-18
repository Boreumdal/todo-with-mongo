import React from 'react'
import { Link } from 'react-router-dom'
import { MdLock, MdPerson, MdEmail } from 'react-icons/md'

type RegProps = {
    register: boolean
    setRegister: (value: boolean) => void
}

const Register = ({ register, setRegister }: RegProps) => {
    const handleRegToggle = () => {
        setRegister(false)
    }
  return (
    <>
        <div className='duration-300 absolute top-0 left-0 w-full h-full bg-overlay z-10' onDoubleClick={handleRegToggle}></div>
        <div className='-rotate-90 mr-3 absolute z-20 text-sm text-gray-300 font-medium tracking-wide'>Double tap outside the box to exit registration</div>
        <div className='absolute ml-[370px] duration-300 z-20'>
            <form className='w-[360px] shadow py-14 px-14 flex flex-col justify-center bg-[#262626] rounded'>

                <div className='mb-2'>
                    <h1 className='text-left font-medium text-2xl'>Registration</h1>
                    <p className='text-sm font-light text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.</p> 
                </div>

                <div className='py-2 my-3'>
                    <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                        <label htmlFor="username" className='text-xl px-1 border-r'><MdPerson /></label>
                        <input type="text" id='username' placeholder='Username' className='outline-none w-full text-sm py-2 px-2' required />
                    </div>
                    <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                        <label htmlFor="email" className='text-xl px-1 border-r'><MdEmail /></label>
                        <input type="email" id='email' placeholder='Email' className='outline-none w-full text-sm py-2 px-2' required />
                    </div>
                    <div className='flex flex-row items-center my-2 bg-white text-gray-800 rounded-sm shadow'>
                        <label htmlFor="password" className='text-xl px-1 border-r'><MdLock /></label>
                        <input type="password" id='password' placeholder='Password' className='outline-none w-full text-sm py-2 px-2' required />
                    </div>
                </div>

                <div className='pt-2 flex flex-col'>
                    <button type='submit' className='w-full text-sm font-bold py-2 px-3 my-1 bg-blue-600 hover:bg-blue-500 duration-200 rounded-sm shadow'>Register</button>
                    <button type='button' onClick={handleRegToggle} className='text-xs hover:text-blue-300 text-center pt-1 duration-200'>I already have an account</button>
                </div>

            </form>
        </div>
    </>
  )
}

export default Register