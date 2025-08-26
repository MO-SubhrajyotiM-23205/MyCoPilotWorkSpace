import React,{ useState,useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';



  

const App = () => {
const oldTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const [selectedTasks, setSelectedTasks] = useState(oldTasks);

useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(selectedTasks));
  },[selectedTasks]);

  const handleDeleteTask = (taskToDelete) => {
    setSelectedTasks((prevTasks) =>
      prevTasks.filter((task) => task !== taskToDelete)
    );
  };

  return (
    <div className='app_container'>
      <TaskForm  setTaskData={setSelectedTasks} />
      <main className='app_main'>
        <TaskColumn title="To Do" tasks={selectedTasks.filter(task => task.status === "todo")} handleDeleteTask={handleDeleteTask} />
        <TaskColumn title="In Progress" tasks={selectedTasks.filter(task => task.status === "in-progress")} handleDeleteTask={handleDeleteTask} />
        <TaskColumn title="Done" tasks={selectedTasks.filter(task => task.status === "done")} handleDeleteTask={handleDeleteTask} />
      </main>

    </div>
  )
  /* const [selectedCountry, setSelectedCountry] = React.useState("");
   return (
     <div>
       <label htmlFor="country-dropdown">Country: </label>
       <ListTest
         asDropdown={true}
         value={"USA"}
         onChange={e => setSelectedCountry(e.target.value)}
       />
       {selectedCountry && (
         <div style={{marginTop: '1rem'}}>Selected Country: {selectedCountry}</div>
       )}
     </div>
   );*/


}

export default App;
