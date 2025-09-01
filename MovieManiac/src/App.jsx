import React from "react";
import "./app.css";
import Navbar from "./assets/Components/NavBar/Navbar";
import MovieList from "./assets/Components/Movielist/MovieList";
import APITest from "./assets/Components/Movielist/APITest";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>

        <Routes>

          <Route path="/movielist" element={<MovieList />} />
          <Route path="/apitest" element={<APITest />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
