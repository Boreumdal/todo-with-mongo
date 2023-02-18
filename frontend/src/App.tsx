import React, { useEffect } from 'react'
import { useData } from './context/SystemContext'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Auth from './utilities/Auth'
import Home from './pages/Home'
import Lead from './pages/Lead'
import Navbar from './components/Navbar'

const App = () => {
  const { user } = useData()
  return (
    <div className='h-screen w-full'>
      <Navbar />
      <Routes>
        <Route path='/'>
          <Route index element={<Lead />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Auth><Home /></Auth>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App