import React, { useEffect } from 'react'
import { useData } from '../context/SystemContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const { token, setUser } = useData()

  const navigate = useNavigate()

  useEffect(() => {
    if (token){
      axios.get(`http://localhost:7000/user/${token}`)
        .then(response => {
          if (response.data.err){
            return console.log('invalid token')
          }
          setUser(response.data.user)
        })
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <h1>Services</h1>
      <div>
        <Link to='/todo' className='text-blue-500'>Todo</Link>
      </div>
    </div>
  )
}

export default Home