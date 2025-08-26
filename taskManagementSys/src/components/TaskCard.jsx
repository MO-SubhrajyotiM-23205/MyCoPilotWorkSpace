import React from 'react';
import './TaskCard.css'; // Assuming you have a CSS file for styling
import TagButton from './TagButton';
import deleteIcon from '../assets/delete.png'; // Adjust the path as necessary

const TaskCard = ({ task, handleDeleteTask, index }) => {

console.log("Rendering Index for task:", index);
    if (!task) return null;
    return (
        <div className="task-card">
            <div className="task-card-title">
                <p>{task.title || "Untitled Task"}</p>
            </div>
            <div className="task-card-details">
                <div className='task-card-status'>
                    {task.tags.map((tag, index) => (
                        <TagButton key={index} Taglabel={tag} />
                    ))}
                    {/* <TagButton Taglabel={task.status || "To Do"} /> */}
                </div>
                <div className='task-card-actions'>
                    <img src={deleteIcon} alt="" className='task-card-delete-icon' onClick={() => handleDeleteTask(task, index)} />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
