import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AkshayTrainingClass, {AkshayDemo,testValue}from './AkshayTrainingClass.jsx'
import DatabaseTest from './DatabaseTest.jsx'

function Test() {
  return (
    <div>
      <h2>This is a test component</h2>
    </div>
  )
}

  
function App() {


  return (
    <>
      <h1>Welcome to Vite + React + Akshay</h1>
      <p>This is a simple application to demonstrate the setup.</p>
      <Test></Test>
      <AkshayTrainingClass></AkshayTrainingClass> 
      <AkshayDemo></AkshayDemo>
      <div>{testValue()}</div>
      <DatabaseTest></DatabaseTest>
    </>
  )
}

export default App
