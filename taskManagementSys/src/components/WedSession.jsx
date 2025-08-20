
import React,{ useState } from 'react';
import './WedSession.css'; // Assuming you have some styles for this component


const WedSession = () => {
  let nextId = 0;
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState('');
  const [arrTasks, setTasks] = useState([]);
  const isDisabled = false;

  const headerStyle = {
    background: 'tomato',
    padding: '10px',
    borderRadius: '5px',
    color: 'white',
  };

  const getTotalCount = () => {
    setTotalCount(totalCount + 1);
  };


    return (
        <div>
            <h2>Wednesday Study Session</h2>
   
            <h1 style={headerStyle}>My Task: {totalCount === 0 ? "No tasks available" : `No of Tasks: ${totalCount}`}</h1>
            <button className="btnClass" disabled={isDisabled} onClick={getTotalCount}>Add Count</button>
            <br />
            <input value={name} onChange={e => setName(e.target.value)} />
            
            <button className="btnClass" onClick={() => { arrTasks.push({id: nextId++, name: name,});}}>
              Add</button>
            <ul>
              {arrTasks.map(task => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
        </div>
    );
};

export default WedSession;