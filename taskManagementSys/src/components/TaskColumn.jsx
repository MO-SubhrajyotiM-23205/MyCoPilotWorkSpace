
import React,{useState} from 'react';
import todoIcon from "../assets/todo-icon.png"; // Adjust the path as necessary
import inProgressIcon from "../assets/glowing-star.png"; // Adjust the path as necessary
import doneIcon from "../assets/check-mark-button.png"; // Adjust the path as necessary
import TaskCard from './TaskCard';
import './TaskColumn.css'; // Assuming you have a CSS file for styling

const TaskColumn = ({title, tasks = []}) => {



    let icon;
    if (title === "To Do") {
        icon = todoIcon;
    } else if (title === "In Progress") {
        icon = inProgressIcon;
    } else if (title === "Done") {
        icon = doneIcon;
    }

    console.log("tasks:", tasks);
    return (
        <div className='task_column'>

                <h2 className='task_column_title'><img src={icon} className='task_column_icon' />{title}</h2>
                <br />
                {/* Render tasks here */}
                {(tasks || []).map((task, index) => (
                    
                    <TaskCard key={index} task={task} />
                ))}

        </div>

    );
};

export default TaskColumn;
