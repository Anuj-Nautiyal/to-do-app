import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [showFinished, setShowFinished] = useState(false)

  const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList))
  }

  useEffect(() => {
    let data = localStorage.getItem("tasks")
    if (data) {
      setTaskList(JSON.parse(data))
    }
  }, [])

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleAdd = () => {
    if (isEditing) {
      setIsEditing(false)
    }
    setTaskList([...taskList, { id: uuidv4(), task, isCompleted: false }])
    setTask("")
    saveToLocalStorage()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let newTaskList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    setTaskList(newTaskList)
    saveToLocalStorage()
  }

  const handleEdit = (id) => {
    setIsEditing(true)
    let editedTask = taskList.filter(item => item.id === id)
    setTask(editedTask[0].task)
    handleDelete(id)
    saveToLocalStorage()
  }

  const handleDelete = (id) => {
    let newTaskList = taskList.filter((item) => item.id !== id)
    setTaskList(newTaskList)
    saveToLocalStorage()
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  return (
    <>
      <header className='flex justify-center items-center my-5 text-white'>
        <span className='text-6xl poppins-bold'>Make Things Happen!</span>
      </header>

      <main className='flex items-center flex-col h-[80vh] w-[50vw] py-2 px-7 border-2 border-gray-500 rounded-lg bg-white shadow-[3px_5px_20px_1px_#1e1310]'>

        <div className="add-task flex items-start my-3 flex-col gap-4 w-full ">
          <span className='text-black text-3xl poppins-medium'>Add a task</span>
          <div className="taskInput flex gap-4">
            <input onChange={handleChange} value={task} type="text" placeholder='Add your new task' className='border-2 border-gray-500 rounded-lg px-4 py-2 w-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-left)] focus:border-transparent' />
            <button onClick={handleAdd} disabled={!task} className='bg-[var(--color-right)] disabled:active:scale-100 disabled:hover:opacity-50 text-white cursor-pointer poppins-regular px-4 py-2 rounded-lg hover:bg-[var(--color-left)] active:scale-95 transition-colors'>{isEditing ? "Update" : "Add"}</button>
          </div>
        </div>

        <div className="taskCompleted flex items-center gap-2 w-full mt-5">
          <input onChange={toggleFinished} id="show" type="checkbox" checked={showFinished} name="" /> 
          <label htmlFor="show" id='show' className='cursor-pointer'>Show Completed Tasks</label>
        </div>
        <div className='h-[1px] mt-2 bg-black opacity-15 w-full'></div>

        <div className="taskList my-3 flex flex-col gap-2 w-full">
          <div className='text-gray-700 text-xl poppins-medium'>Your Tasks</div>
          {taskList.length === 0 && <div className='text-gray-500 text-center my-8 poppins-medium'>No tasks added yet!</div>}
          {taskList.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="task flex justify-between items-center">
              <div className="taskSection flex gap-3 items-center">
                <span><input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" /></span>
                <p className={item.isCompleted ? "line-through" : ""}>{item.task}</p>
              </div>
              <div className="side-buttons flex gap-2">
                <button onClick={() => handleEdit(item.id)} className='bg-[var(--color-right)] text-white cursor-pointer poppins-regular px-4 py-2 rounded-lg hover:bg-[var(--color-left)] active:scale-95 transition-colors'><FaRegEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='bg-[var(--color-right)] text-white cursor-pointer poppins-regular px-4 py-2 rounded-lg hover:bg-[var(--color-left)] active:scale-95 transition-colors'><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </main>
    </>
  )
}
export default App
