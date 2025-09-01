import React from "react";
import "./app.css";
import Navbar from "./assets/Components/NavBar/Navbar";
import MovieList from "./assets/Components/Movielist/MovieList";
import APITest from "./assets/Components/Movielist/APITest";
import NotFound from "./assets/Components/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/apitest" element={<APITest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
