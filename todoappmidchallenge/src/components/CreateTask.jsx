import React, { useState } from 'react'

export const CreateTask = (props) => {

    const { isOpen, closeModal, setTaskListItems, taskListItems, currentTask } = props
    if (!isOpen) return null;

    const [ currentTaskEdit, setCurrentTaskEdit ] = useState(currentTask? currentTask : {
        taskTitle: '',
        description: '',
        status: 'Pending',
        id: ''
    })

    const generateUniqueId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      };

    const handleNewTask = (e) => { 
        console.log('creating new task')
        e.preventDefault();
        const newTask = {
            taskTitle: document.querySelector('input').value,
            description: document.querySelector('textarea').value,
            status: 'Pending',
            id: generateUniqueId()
        };
        setTaskListItems([...taskListItems, newTask]);
        closeModal()
    }

    const handleEditTask = (e) => { 
        console.log('edit task')
        e.preventDefault();
        setTaskListItems(taskListItems.map(task => task.id === currentTaskEdit.id? currentTaskEdit : task));
        closeModal()
    }

    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.content}>
          <button onClick={closeModal} style={modalStyles.closeButton}>X</button>
            {currentTask ? 
                <h2>Edit task</h2>
                :
                <h2>Create a new task</h2>
            }

            <form>
              <input type="text" placeholder="Task title" value={currentTaskEdit.taskTitle} onChange={(e) => setCurrentTaskEdit({...currentTaskEdit, taskTitle: e.target.value})} />
              <textarea placeholder="Task description" rows="5" value={currentTaskEdit.description} onChange={(e) => setCurrentTaskEdit({...currentTaskEdit, description: e.target.value})} ></textarea>
              <button onClick={(event) =>  currentTask?  handleEditTask(event) : handleNewTask(event)}> {currentTask ? 'Edit Task' : 'Add task'} </button>
            </form>
  
        </div>
      </div>
    );
  };
  
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '4px',
      width: '300px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };