import React, { useEffect } from 'react'
import { useData } from '../context/SystemContext'
import { useNavigate } from 'react-router-dom'
import Login from '../pages/Login'

type AuthChildren = {
    children: React.ReactNode
}

const Auth = ({ children }: AuthChildren) => {
    const { token } = useData()

    if (!token) {
        return <Login />
    }

    return (
        <>{ children }</>
    )
}

export default Auth