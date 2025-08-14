import { useState } from 'react'
import Test, { Test2, Test3 } from './Test.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  //const [counter, setCounter] = useState(5)
  let counter = 5 // Using a simple variable instead of state for demonstration

 
  const handleClick = () => {
    setCount(count + 1)
  }
  const Sumveriable = (varCounter) => {
    
      counter = varCounter + 1
      alert("Variable is: " + counter) 
  }
  return (
    <>
     
      <h1>Understand the useState</h1>
      <p>Current count is: {count}</p>
      <p>Current counter is: {counter}</p>
      <button onClick={handleClick}>Increment Count</button>
      <button onClick={() => setCount(0)}>Reset Count</button>
      <button onClick={() => Sumveriable(counter)}>Increment Variable {counter}</button>
  <Test />
  <Test2 />
  <Test3 />
    </>
  )
}

export default App
