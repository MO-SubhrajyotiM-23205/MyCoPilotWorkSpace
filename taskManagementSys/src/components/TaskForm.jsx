import React, { useState } from 'react';
import './TaskForm.css'; // Assuming you have a CSS file for styling
import TagButton from './TagButton';
// Adjust the path as necessary

const TaskForm = () => {

    const [formData, setFormData] = useState({
        title: "",
        status: "todo",
        tags: []
    });


const setInputData = (e) => {
    const { name, value } = e.target;
    // setFormData({
    //     ...formData,
    //     [name]: value,[status]: value
    // });
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }))
};
console.log(formData);

return (
    <div>
        <header className='app_header'> Task Management System</header>
        <form className='task_form'>

            <input type="text" name="title" className='task_input' placeholder="Task Title" onChange={setInputData} />
            <div className='task_form_actions' >
                <TagButton Taglabel="HTML" />
                <TagButton Taglabel="CSS" />
                <TagButton Taglabel="JavaScript" />
                <TagButton Taglabel="React" />

                <select name="status" className='task_status' onChange={setInputData}>
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
