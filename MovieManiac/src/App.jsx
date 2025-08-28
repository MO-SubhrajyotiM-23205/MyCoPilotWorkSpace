import React from "react";
import "./app.css";
import Navbar from "./assets/Components/NavBar/Navbar";
import MovieList from "./assets/Components/Movielist/MovieList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MovieList />
      </main>
    </div>
  );
}

export default App;
