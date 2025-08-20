import React from 'react';

const DemoClass = () => {

    let cnttsk = 0;
    const isDisabled = false;
    const returnTaskCount = () => {
      return cnttsk === 0 ? "No tasks available" : `No of Tasks: ${cnttsk}`;
    };

    const addTask = () => {
      cnttsk++;
      alert(`Task added successfully! Total tasks: ${cnttsk}`);
    };

  return (
    

    <div>

      <h1 style={{"backgroundColor":"red"}}>Count Task {returnTaskCount()}</h1>
      <button disabled={isDisabled} onClick={() => cnttsk++}>Add Task</button>
      <button disabled={isDisabled} onClick={addTask}>Add Task</button>
    </div>
  );
};


export default DemoClass;
