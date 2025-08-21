import React from 'react';
import './TaskCard.css'; // Assuming you have a CSS file for styling
import TagButton from './TagButton';
import deleteIcon from '../assets/delete.png'; // Adjust the path as necessary

const TaskCard = () => {
    return (
        <>
         <div className="task-card-title">
            <p>Task Title</p>
        </div>
        <div className="task-card-details">
           <div className='task-card-status'>
               <TagButton Taglabel="To Do" />
               <TagButton Taglabel="In Progress" />
               <TagButton Taglabel="Done" />
           </div>
           <div className='task-card-actions'>

                   <img src={deleteIcon} alt="" className='task-card-delete-icon'/>
             
           </div>
        </div>
        </>
       
    );
};

export default TaskCard;
