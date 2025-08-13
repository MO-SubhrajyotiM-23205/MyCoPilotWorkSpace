import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestClass,{TestClass2, getVariable} from './TestClass.jsx'
import StudentRegistration from './StudentRegistration.jsx'
import ApiDataComponent from './ApiDataComponent.jsx'
import BusinessDashboard from './BusinessDashboard.jsx' 

function TestFunction() {
  return (
    <div>
      <h1>Hello from TestFunction!</h1>
    </div>
  )
}

function App() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [showApiData, setShowApiData] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration)
    setShowApiData(false)
    setShowDashboard(false)
  }

  const toggleApiData = () => {
    setShowApiData(!showApiData)
    setShowRegistration(false)
    setShowDashboard(false)
  }

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard)
    setShowRegistration(false)
    setShowApiData(false)
  }

  return (
    <div className="App">
      <nav className="nav-container">
        <div className="nav-buttons">
          <button 
            onClick={toggleRegistration}
            className={`nav-button ${showRegistration ? 'secondary' : 'primary'}`}
          >
            {showRegistration ? 'Close Registration Form' : 'Student Registration'}
          </button>
          
          <button 
            onClick={toggleApiData}
            className={`nav-button ${showApiData ? 'secondary' : 'primary'}`}
          >
            {showApiData ? 'Close API Data' : 'API Data'}
          </button>

          <button 
            onClick={toggleDashboard}
            className={`nav-button ${showDashboard ? 'secondary' : 'primary'}`}
          >
            {showDashboard ? 'Close Dashboard' : 'Business Dashboard'}
          </button>
        </div>
      </nav>

      {!showRegistration && !showApiData && !showDashboard && (
        <div className="content-section">
          <h1>Hello React Test!</h1>
          <TestClass />
          <TestClass2 />
          <TestFunction />
          <div>
            <h1>Variable Value: {getVariable()}</h1>
          </div>
        </div>
      )}
      
      {showRegistration && (
        <div className="content-section">
          <StudentRegistration />
        </div>
      )}

      {showApiData && (
        <div className="content-section">
          <ApiDataComponent />
        </div>
      )}

      {showDashboard && (
        <div className="content-section">
          <BusinessDashboard />
        </div>
      )}
    </div>
  )
}

export default App
