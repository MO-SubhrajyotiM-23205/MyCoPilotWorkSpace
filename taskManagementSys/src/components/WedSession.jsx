
import React,{ useState } from 'react';
import './WedSession.css'; // Assuming you have some styles for this component


const WedSession = () => {

  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

    return (
        <div>
            <h2>Wednesday Study Session</h2>
            <input type="text" placeholder="Add a new task" onChange={handleInputChange} />
            <h1 style={headerStyle}>My Task: {totalCount === 0 ? "No tasks available" : `No of Tasks: ${totalCount}`}</h1>
            <button className="btnClass" disabled={isDisabled} onClick={getTotalCount}>Add Count</button>

        </div>
    );
};

export default WedSession;