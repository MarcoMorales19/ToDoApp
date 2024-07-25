import React, { useState, useEffect } from 'react'
import  './TaskList.css'
import { Header } from './Header.jsx'
import { CreateTask } from './CreateTask.jsx'

export const TaskList = () => {

    const [ statusSearch, setStatusSearch ] = useState('All')
    const [ currentTask, setCurrentTask ] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [ taskListItems, setTaskListItems ] = useState( [
        {
        id: 0,
        taskTitle: 'Task 1',
        description: 'Task Description 1',
        status: 'Pending'

      },{
        id: 1,
        taskTitle: 'Task 2',
        description: 'Task Description 2',
        status: 'Completed'

      }, {
        id: 2,
        taskTitle: 'Task 3',
        description: 'Task Description 3',
        status: 'Pending'
  
    }])

    const handleDeleteTask = (taskId) => {
        console.log('Delete Task', taskId)
        setTaskListItems(taskListItems.filter(task => task.id!== taskId))
    }
    
    const filteredTaskList = () => {
        if (statusSearch === 'All') return taskListItems
        return (taskListItems.filter(task => task.status === statusSearch))
    }
    const completeTask = (taskId) => { 
        // check if taskId is already completed 
        const taskFound = taskListItems.find(task => task.id === taskId && task.status === 'Completed')
        if (taskFound) {
            console.log('completed', taskFound)
            //change task to pending status
            // setTaskListItems({...taskFound, status: 'Pending'})
            setTaskListItems((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === taskId ? { ...task, status: 'Pending' } : task
                )
              )
        } else {

            setTaskListItems(taskListItems.map(task => task.id === taskId? {...task, status: 'Completed'} : task))
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

      const handleEditCurrentTask = (task) => {
        setCurrentTask(task)
        openModal()
      }
      
      console.log(filteredTaskList())
  // Render the Task List with Task List Items
  return (
    <>
        <CreateTask isOpen={isModalOpen} closeModal={closeModal} setTaskListItems={setTaskListItems} taskListItems={taskListItems} />
        <CreateTask isOpen={isModalOpen} closeModal={closeModal} setTaskListItems={setTaskListItems} taskListItems={taskListItems} currentTask={currentTask}/>
        
        <Header statusSearch={statusSearch} setStatusSearch={setStatusSearch} openModal={openModal} />

        <main className='tasklist'>
            <ul>
                {filteredTaskList().map(taskItem => {

                 return (
                        <li  key={taskItem.id} className='TaskListLi'>
                            <div>
                                <strong>{taskItem.taskTitle}</strong>
                            </div>
                            <div>{taskItem.description}</div>
                            <strong>{taskItem.status}</strong>
                            <footer>
                                    
                                    <div style={{display: 'inline-block', padding: '5px' }}>
                                        <button type='button' onClick={() =>handleDeleteTask(taskItem.id)} style={{marginRight: '10px'}}>Delete</button>
                                        <button type='button' onClick={() => handleEditCurrentTask(taskItem)} style={{marginRight: '10px'}}>Edit</button>

                                    </div>
                                        <label>
                                            Complete
                                            <input type='checkbox' name='status' label='completed' checked= {taskItem.status === 'Completed' ? true : false} onClick={() =>completeTask(taskItem.id) }></input>
                                        </label>

                            </footer>
                        </li>
                        )
                    })
                }
            
            </ul>
        </main>
    </>
  )
}
