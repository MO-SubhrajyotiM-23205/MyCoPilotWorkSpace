import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';


const App =()=>{

   return (
     <div className='app_container'>
       <TaskForm />
       <main className='app_main'>
         <TaskColumn title="To Do" />
         <TaskColumn title="In Progress" />
         <TaskColumn title="Done" />
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
