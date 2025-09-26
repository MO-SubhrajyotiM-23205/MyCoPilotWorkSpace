import React from "react";
import UserContext from "./Contexts/UserContext";
import ErrorBoundary from './ErrorBoundary.jsx'
import { Route, Routes, useNavigate } from "react-router-dom";
import TestQueryString from "./assets/Components/TestQueryString";
import "./app.css";
import Navbar from "./assets/Components/NavBar/Navbar";
import MovieList from "./assets/Components/Movielist/MovieList";
import APITest from "./assets/Components/Movielist/APITest";
import NotFound from "./assets/Components/NotFound";
import APIAxiosCalling from "./assets/Components/Movielist/APIAxiosCalling";
import DBBindList from "./assets/Components/DBBindList";
import APIcallthroughUseData from "./assets/Components/Movielist/APIcallthroughUseData";
import CheckUseRefHook from "./assets/Components/CheckUseRefHook";
import CreateReackFormHook from "./assets/Components/CreateReackFormHook";
import CheckUseMemo from "./assets/Components/CheckUseMemo.jsx";
import CheckWorker from "./assets/Components/CheckWorker.jsx";
import CheckUseCallback from "./assets/Components/UseCallbackTest/UsecallbackCheck.jsx";
import UseReducerHook from "./assets/Components/UseReducerHook.jsx";




function App() {
  const navigate = useNavigate();
  const handleTestQuery = () => {
    navigate("/testabc?name=Subhro&phone=123456");
  };
  // Example context value
  const userContextValue = {
    name: "Subhro",
    phone: "123456",
    role: "admin"
  };
  return (
    <UserContext.Provider value={userContextValue}>
      <ErrorBoundary>
        <div className="App">
           <Navbar />
          <main>
            <button onClick={handleTestQuery} style={{margin: '1rem'}}>Show TestQueryString</button>
            <Routes >
              <Route path="/" element={<MovieList />} />
              <Route path="/movielist" element={<MovieList />} />
              <Route path="/apitest" element={<APITest />} />
              <Route path="/testabc" element={<TestQueryString />} />
              <Route path="/axioscalling" element={<APIAxiosCalling />} />
              <Route path="/dbbindlist" element={<DBBindList />} />
              <Route path="/apicallthroughusedata" element={<APIcallthroughUseData />} />
              <Route path="/checkuserefhook" element={<CheckUseRefHook />} />
              <Route path="/checkreackformhook" element={<CreateReackFormHook />} />
              <Route path="*" element={<NotFound />} />
            </Routes> 
             {/* {/* <CheckUseCallback />
             <UseReducerHook /> */}
          </main> 

         
        </div>
      </ErrorBoundary>
    </UserContext.Provider>
  );
}

export default App;
