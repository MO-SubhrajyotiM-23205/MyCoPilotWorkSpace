import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TestQueryString from "./assets/Components/TestQueryString";
import "./app.css";
import Navbar from "./assets/Components/NavBar/Navbar";
import MovieList from "./assets/Components/Movielist/MovieList";
import APITest from "./assets/Components/Movielist/APITest";
import NotFound from "./assets/Components/NotFound";
import APIAxiosCalling from "./assets/Components/Movielist/APIAxiosCalling";

function App() {
  const navigate = useNavigate();
  const handleTestQuery = () => {
    navigate("/testabc?name=Subhro&phone=123456");
  };
  return (
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
