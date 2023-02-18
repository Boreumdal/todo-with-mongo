import React from 'react'
import { Link } from 'react-router-dom'

const Lead = () => {
  return (
    <div className='h-[92vh] flex justify-center items-center relative'>
        <div className='w-1/3 flex flex-col gap-3 items-center shadow rounded bg-[#262626] py-8'>
            <h1 className='py-1 font-medium text-3xl'>Welcome</h1>
            <p className='py-2 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae odio magni tenetur quas non, quibusdam dolores velit! Dignissimos, consectetur iste? Vitae, cupiditate! Dolores, laudantium.</p>
            <Link to='/login' className='py-1 px-5 bg-blue-500 w-fit text-center rounded-sm'>Login</Link>
        </div>
    </div>
  )
}

export default Lead