import React from 'react'

const Todo = () => {
  return (
    <div>
        <div>
            <h1>Tab</h1>
            <div>
                <h1>Add a tab</h1>
                <form className='flex flex-col w-fit'>
                    <input type="text" placeholder='Todo' />
                    <input type="checkbox" name="" id="" />
                    <input type="date" />
                    <button className='bg-red-600 px-3'>Add</button>
                </form>
            </div>
        </div>
        <div>
            <div></div>
        </div>
    </div>
  )
}

export default Todo