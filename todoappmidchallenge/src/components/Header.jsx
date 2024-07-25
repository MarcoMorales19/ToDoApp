import React, { useState} from 'react'


export const Header = (props) => {

    const {setStatusSearch, openModal} = props

    const handleChangeSelectStatus = (event) => { 
        // TODO: Implement logic to change the status of all tasks based on the selected value in the dropdown menu.
        // You can use the provided `setTasks` function to update the state of tasks.s
        setStatusSearch(event.target.value)
    }

  return (
    <>
    <div>
        <h1>Task List</h1>

        <label style= {{ marginRight: '5px'}}>Status: </label>
        <select id='StatusSelect' onChange={(e) => handleChangeSelectStatus(e)}>
            <option value='All'>All</option>
            <option value='Completed'>Completed</option>
            <option value='Pending'>Pending</option>
        </select>

        <div style={{display:'inline-block', margin: '10px'}}>
            <button onClick={() => openModal()} > 
                Add Task
            </button>
        </div>
    </div>
        
    </>
  )
}
