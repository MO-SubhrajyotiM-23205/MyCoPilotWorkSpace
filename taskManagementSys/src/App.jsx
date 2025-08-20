import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import ListTest from './components/listTest';

const App =()=>{

   return (
     <div className='app_container'>
       <TaskForm />
       <main className='app_main'>
         <section className='app_main_section'>Section 1</section>
         <section className='app_main_section'>Section 2</section>
         <section className='app_main_section'>Section 3</section>
       </main>
      
     </div>
   )
/*   const [selectedCountry, setSelectedCountry] = React.useState("");
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
