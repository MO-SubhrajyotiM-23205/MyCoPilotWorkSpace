import React, { useState } from 'react';
import './TaskForm.css'; // Assuming you have a CSS file for styling
import TagButton from './TagButton';
 // Adjust the path as necessary

const TaskForm = () => {

    return (
        <div>
            <header className='app_header'> Task Management System</header>
            <form className='task_form'>

                <input type="text" className='task_input' placeholder="Task Title" />
                <div className='task_form_actions'>
                    <TagButton Taglabel="HTML" />
                    <TagButton Taglabel="CSS" />
                    <TagButton Taglabel="JavaScript" />
                    <TagButton Taglabel="React" />

                    <select className='task_status'>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <button type='submit' className='task_submit'>Add Task</button>
                   
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
