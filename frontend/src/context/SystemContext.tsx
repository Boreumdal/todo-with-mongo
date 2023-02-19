import React, { createContext, useContext, useState, useEffect } from 'react'

type ContextChildren = {
    children: React.ReactNode
}

interface TodoInterface {
    when: string,
    what: string,
    who: string,
    star: number,
    created_at: number,
    status: string
}

interface UserInterface {
    _id: string
    username: string,
    email: string
}

interface NotifInterface {
    msg: string,
    err: string
  }
  

const SysContext = createContext<any>(null)

export const SystemContext = ({ children }: ContextChildren ) => {
    const [todos, setTodos] = useState<TodoInterface[]>([])
    const [user, setUser] = useState<UserInterface>({ _id: '', username: '', email: ''})
    const [token, setToken] = useState<string>('')

  return (
    <SysContext.Provider value={{ todos, setTodos, user, setUser, token, setToken }}>{ children }</SysContext.Provider>
  )
}

export const useData = () => {
    return useContext(SysContext)
}