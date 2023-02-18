import React from 'react'
import { useData } from '../context/SystemContext'
import { useNavigate } from 'react-router-dom'

type AuthChildren = {
    children: React.ReactNode
}

const Auth = ({ children }: AuthChildren) => {
    const { user, token } = useData()
    const navigate = useNavigate()

    // if (!user.id) {
    //     navigate('/login')
    // } else {
        
    // }

    return (
        <>{ children }</>
    )
}

export default Auth