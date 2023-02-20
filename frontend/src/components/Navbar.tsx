import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../context/SystemContext'

const Navbar = () => {
  const { user } = useData()
  const location = useLocation()

  return (
    <nav className='grid grid-cols-3 h-[8vh] items-center bg-[#262626] px-7 shadow'>
        <div className=''>

        </div>
        <h1 className='text-center font-light text-3xl'>V1</h1>
        <div className='flex flex-row gap-4 items-center justify-self-end text-sm'>
          {
            user?._id
            ? <Link to='/home' className='py-1 px-2 hover:text-blue-300 rounded duration-200'>Home</Link>
            : location.pathname !== '/login' && <Link to='/login' className='py-1 px-3 rounded-sm font-medium bg-green-600 text-white shadow'>Login</Link>
          }
            
            
        </div>
    </nav>
  )
}

export default Navbar