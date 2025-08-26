import React,{ useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';





const App = () => {

  const [selectedTasks, setSelectedTasks] = useState([]);


  console.log(selectedTasks);
  return (
    <div className='app_container'>
      <TaskForm  setTaskData={setSelectedTasks} />
      <main className='app_main'>
        <TaskColumn title="To Do" tasks={selectedTasks.filter(task => task.status === "todo")} />
        <TaskColumn title="In Progress" tasks={selectedTasks.filter(task => task.status === "in-progress")} />
        <TaskColumn title="Done" tasks={selectedTasks.filter(task => task.status === "done")} />
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
