import React from "react";
import "./app.css";
import Navbar from "./assets/Components/NavBar/Navbar";
import MovieList from "./assets/Components/Movielist/MovieList";
import APITest from "./assets/Components/Movielist/APITest";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        
        <APITest />
      </main>
    </div>
  );
}

export default App;
