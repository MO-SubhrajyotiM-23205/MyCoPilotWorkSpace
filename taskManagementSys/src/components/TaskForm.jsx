import React, { useState } from 'react';
import './TaskForm.css'; // Assuming you have a CSS file for styling
import TagButton from './TagButton';
// Adjust the path as necessary

const TaskForm = ({ setTaskData }) => {

    const [formData, setFormData] = useState({
        title: "",
        status: "todo",
        tags: []
    });


const setInputData = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }))
};
const selecttag = (tag) => {
    setFormData(prevData => {
        const { tags } = prevData;
        if (tags.includes(tag)) {
            // Remove tag
            return {
                ...prevData,
                tags: tags.filter(t => t !== tag)
            };
        } else {
            // Add tag
            return {
                ...prevData,
                tags: [...tags, tag]
            };
        }
    });
};

const onSubmitHandle = (e) => {
    e.preventDefault();
    setTaskData((prevSelected) => {
        return [...prevSelected, formData];
    });
    setFormData({
        title: "",
        status: "todo",
        tags: []
    });

};

const checkselected = (tag) => {
    return formData.tags.includes(tag);
};

return (
    <div>
        <header className='app_header'> Task Management System</header>
        <form className='task_form'>

            <input type="text" name="title" className='task_input' placeholder="Task Title" value={formData.title} onChange={setInputData} />
            <div className='task_form_actions' >
                <TagButton Taglabel="HTML" selecttag1={selecttag} isSelected={checkselected("HTML")} />
                <TagButton Taglabel="CSS" selecttag1={selecttag} isSelected={checkselected("CSS")} />
                <TagButton Taglabel="JavaScript" selecttag1={selecttag} isSelected={checkselected("JavaScript")} />
                <TagButton Taglabel="React" selecttag1={selecttag} isSelected={checkselected("React")} />

                <select name="status" className='task_status' onChange={setInputData}>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <button type='submit' className='task_submit' onClick={onSubmitHandle}>Add Task</button>

            </div>
        </form>
    </div>
);
};

export default TaskForm;
