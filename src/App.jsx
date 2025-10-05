import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className='flex justify-center items-center my-5 text-white'>
        <h1 className='text-6xl font-bold'>Make Things Happen!</h1>
      </header>

      <main className='flex items-center flex-col h-[70vh] w-[50vw] py-5 px-7 border-2 border-gray-500 rounded-lg bg-white shadow-[3px_5px_20px_1px_#1e1310]'>

        <div className="add-task flex items-start flex-col gap-4 w-full ">
          <div className='text-black text-3xl font-bold'>Add a task</div>

          <div className="taskInput flex gap-4">
            <input type="text" placeholder='Add your new task' className='border-2 border-gray-500 rounded-lg px-4 py-2 w-xl focus:outline-none' />
            <button className='bg-[var(--color-right)] text-white cursor-pointer font-bold px-4 py-2 rounded-lg hover:bg-[var(--color-left)] active:scale-95 transition-colors'>Add Task</button>
          </div>

        </div>
      </main>
    </>
  )
}

export default App
