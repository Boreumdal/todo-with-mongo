import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useData } from '../context/SystemContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { FiTrash, FiEdit2 } from 'react-icons/fi'
import Masonry from 'react-masonry-css'

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
    const whatRef = useRef<any>(null)
    const [when, setWhen] = useState<string>('')

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
    }

    const fetchesTodos = (id: string) => {
        axios.get(`http://localhost:7000/todo/${id}`)
            .then(response => {
                setTodos(response.data.todos.reverse())
            })
    }

    const handleAddTodo = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('http://localhost:7000/todo/add', {
            what: whatRef.current.value,
            when: hasDue ? when : 'None',
            bg,
            who: user._id
        })
            .then(response => {
                successPop(response.data.msg)
                reset()
                fetchesTodos(user._id)
            })
    }

    const breakpointCols = {
        default: 6,
        1100: 5,
        700: 2,
        500: 1
    };

    const randomBg = useCallback(() => {
        return Math.ceil(Math.random() * 7)
    }, [])

    useEffect(() => {
        fetchesTodos(user._id)
    }, [])

  return (
    <div>
        <div>
            <h1>Tab</h1>
            <div className='w-1/2 bg-[#262626] py-5 px-3'>
                <h1 className='text-xl font-bold pb-2'>Add a task</h1>
                <div className='grid grid-cols-2 gap-4 py-2'>
                    <div className=''>
                        <form onSubmit={handleAddTodo} className={`sticky-${bg} p-5 flex flex-col w-full`}>
                            <textarea ref={whatRef} className='mb-1 bg-transparent' rows={4} placeholder='Todo'></textarea>
                            <p className='text-xs font-medium'>{ hasDue ? when : 'None' }</p>
                        </form>
                    </div>
                    <div>
                        <div className='flex flex-row items-center'>
                            <div className={`sticky-${bg} rounded-full h-9 aspect-square`}></div>
                            <select value={bg} id='color' className='text-sm h-9 rounded-sm px-2 text-black outline-none w-full ml-2' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBg(e.target.value)}>
                                <option value="a">Color 1</option>
                                <option value="b">Color 2</option>
                                <option value="c">Color 3</option>
                                <option value="d">Color 4</option>
                                <option value="e">Color 5</option>
                                <option value="f">Color 6</option>
                                <option value="g">Color 7</option>
                            </select>
                        </div>
                        <div className='py-2'>
                            <input type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhen(e.target.value)} className='text-sm h-9 rounded-sm px-2 text-black outline-none w-full' disabled={!hasDue && true} />
                            <div className='flex flex-row items-center gap-2 py-2'>
                                <input type="checkbox" id='hasDue' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasDue(e.target.checked)} />
                                <label htmlFor="hasDue" className='text-sm font-medium'>Task has due?</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className='m-7'>
            <Masonry
                breakpointCols={breakpointCols}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    todos.map((todo: TodoInterface, idx: number) => (
                        <div key={idx} className={`sticky-${todo?.bg}` + ' px-4 py-6'}>
                            <div className='flex pb-3 flex-row justify-between'>
                                <p>{ todo?.what.charAt(0).toUpperCase() + todo?.what.slice(1) }</p>
                                <button className='h-fit bg-orange-500 p-2 rounded-full'><FiTrash /></button>
                            </div>
                            <div className='flex flex-row justify-between items-center'>
                                <p className='font-medium text-xs'>{ todo?.when }</p>
                                <button className='text-xl p-2 rounded-full bg-orange-500 shadow'><FiEdit2 /></button>
                            </div>
                        </div>
                    ))
                }
            </Masonry>
        </div>
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
  )
}

export default Todo