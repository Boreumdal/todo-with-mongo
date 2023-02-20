import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react'
import { useData } from '../context/SystemContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { FiTrash, FiEdit2, FiSave, FiCheck } from 'react-icons/fi'
import { BsBookmarkCheck } from 'react-icons/bs'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'

interface TodoInterface {
    _id: string,
    who: string,
    what: string,
    when: string,
    status: string,
    star: number,
    bg: string,
    created_at: number
}

const Todo = () => {
    const { user, todos, setTodos } = useData()

    const [bg, setBg] = useState<string>('a')
    const [hasDue, setHasDue] = useState<boolean>(false)
    const [what, setWhat] = useState<string>('')
    const [when, setWhen] = useState<string>('')

    const editingWhatRef = useRef<HTMLTextAreaElement | null>(null)
    const editingWhenRef = useRef<HTMLInputElement | null>(null)

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

    const reset = () => {
        setHasDue(false)
        setWhen('')
        setWhat('')
    }

    const fetchesTodos = (id: string) => {
        axios.get(`http://localhost:7000/todo/${id}`)
            .then(response => {
                setTodos(response.data.todos.reverse())
            })
    }

    const handleAddTodo = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (what){
            axios.post('http://localhost:7000/todo', {
                what,
                when: hasDue ? when : 'None',
                bg,
                who: user._id
            })
                .then(response => {
                    successPop(response.data.msg)
                    reset()
                    fetchesTodos(user._id)
                })
        } else {
            errorPop('Fill the task input field first')
        }

    }

    const handleDelete = (id: string) => {
        axios.delete('http://localhost:7000/todo', { data: { id } })
            .then((respoonse) => {
                successPop(respoonse.data.msg)
                fetchesTodos(user._id)
            })
    }

    const handleEditToggle = (id: string) => {
        const has = todos.some((todo: any) => todo.status === 'todo-edit')
        
        if (!has){
            axios.patch('http://localhost:7000/todo/toggle', { id })
                .then((respoonse) => {
                    successPop(respoonse.data.msg)
                    fetchesTodos(user._id)
                })
        } else {
            errorPop('Please save the one you\'re editing first')
        }
    }

    const handleEditSave = (id: string) => {
        const whatRef = editingWhatRef.current
        const whenRef = editingWhenRef.current
        if (editingWhatRef.current?.value){
            axios.patch('http://localhost:7000/todo', {
                id,
                what: whatRef?.value,
                when: whenRef?.value ? whenRef?.value : 'None'
            })
            .then(response => {
                successPop(response.data)
                fetchesTodos(user._id)
            })
        } else {
            errorPop('You can\'t save blank todo')
        }
    }

    const breakpointCols = {
        default: 6,
        1100: 5,
        900: 3,
        500: 2
    };

    const stickies = todos.length === 0
        ? <p>No tasks found</p>
        : todos.map((todo: TodoInterface, idx: number) => (
        <div key={idx} className={`sticky-${todo?.bg} hover:scale-[1.01] cursor-pointer duration-200 sticky-container`}>
            <div className='bg-[#ffffff60] flex-row flex items-center justify-between p-1'>
                <div className='flex flex-row items-center w-2/3'>
                    <p className='text-sm w-fit p-1 hover:text-white hover:bg-green-500 duration-200 rounded-full'><BsBookmarkCheck /></p>
                    <div className='w-2/3'>
                        {
                            todo?.status === 'todo'
                            ? <p className='text-xs font-bold italic opacity-70 text-ellipsis overflow-x-hidden whitespace-nowrap'>ID: { todo?._id }</p>
                            : <p className='text-xs font-bold italic opacity-80 text-ellipsis overflow-x-hidden whitespace-nowrap'>Editing</p>
                        }
                        
                    </div>
                </div>
                
                <div className='flex flex-row'>
                    { todo?.status === 'todo' && <button onClick={() => handleEditToggle(todo._id)} className='text-sm rounded-full p-1 hover:text-white hover:bg-orange-400 duration-200'><FiEdit2 /></button> }
                    <button onClick={() => handleDelete(todo._id)} className='text-sm rounded-full p-1 hover:text-white hover:bg-red-400 duration-200'><FiTrash /></button>
                </div>
            </div>
            <div className='py-3 px-4'>
                <div className='flex flex-row justify-between pb-1'>
                    {
                        todo.status === 'todo'
                        ? <p>{ todo?.what.charAt(0).toUpperCase() + todo?.what.slice(1) }</p>
                        : <textarea defaultValue={todo?.what} ref={editingWhatRef} rows={4} className='outline-0 border bg-transparent'></textarea>
                    }
                </div>
                <div className='flex flex-row justify-between items-center gap-1 pt-2'>
                    {
                        todo.status === 'todo'
                        ? <p className='font-bold text-xs opacity-60 '>{ todo?.when }</p>
                        : <input type='date' defaultValue={todo?.when} ref={editingWhenRef} className='outline-0 border bg-transparent font-bold py-1 text-xs opacity-60' />
                    }
                    {
                        todo?.status === 'todo' 
                        ? <button onClick={() => handleEditSave(todo._id)} className='text-lg p-2 rounded-full text-white shadow bg-green-400 hover:bg-orange-500 duration-300 sticky-done'><FiCheck /></button>
                        : <button onClick={() => handleEditSave(todo._id)} className='text-lg p-2 rounded-full text-white shadow bg-orange-400 hover:bg-orange-500 duration-200'><FiSave /></button>
                    }
                </div>
            </div>
                
        </div>
    )) 

    useEffect(() => {
        fetchesTodos(user._id)
    }, [])

  return (
    <div className='flex flex-col'>
        <div className='w-1/2 bg-[#262626] py-5 px-6 mt-5 shadow-sm mx-auto'>
            <h1 className='text-xl font-bold pb-2 border-b border-[#4b4b4b]'>Add a task</h1>
            <form onSubmit={handleAddTodo} className='grid grid-cols-2 gap-4 pb-2 pt-3'>
                <div className=''>
                    <div className={`sticky-${bg} p-5 flex flex-col w-full`}>
                        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWhat(e.target.value)} value={what} className='mb-1 bg-transparent' rows={4} placeholder='Todo'></textarea>
                        <p className='text-xs font-medium'>{ hasDue ? when === '' ? 'Date' : when : 'None' }</p>
                    </div>
                </div>
                <div className='pr-2 flex flex-col justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className={`sticky-${bg} rounded-full h-9 aspect-square`}></div>
                        <select value={bg} id='color' className='text-sm h-9 rounded-sm px-2 text-black outline-none w-full ml-2' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBg(e.target.value)}>
                            <option className='sticky-a' value="a">Color 1</option>
                            <option className='sticky-b' value="b">Color 2</option>
                            <option className='sticky-c' value="c">Color 3</option>
                            <option className='sticky-d' value="d">Color 4</option>
                            <option className='sticky-e' value="e">Color 5</option>
                            <option className='sticky-f' value="f">Color 6</option>
                            <option className='sticky-g'value="g">Color 7</option>
                        </select>
                    </div>
                    <div className='pt-2'>
                        <input type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhen(e.target.value)} value={when} className='text-sm h-9 rounded-sm px-2 text-black outline-none w-full' disabled={!hasDue && true} />
                        <div className='flex flex-row items-center gap-2 py-2'>
                            <input type="checkbox" id='hasDue' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasDue(e.target.checked)} checked={hasDue && true} />
                            <label htmlFor="hasDue" className='text-sm font-medium'>Task has due?</label>
                        </div>
                    </div>
                    <button type='submit' className='h-9 bg-green-600'>Add Task</button>
                </div>
            </form>
        </div>
        <div className='m-7'>
            <Masonry
                breakpointCols={breakpointCols}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                { stickies }
            </Masonry>
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="dark" />
    </div>
  )
}

export default Todo