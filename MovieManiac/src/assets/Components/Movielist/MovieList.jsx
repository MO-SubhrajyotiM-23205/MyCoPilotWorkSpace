import React from "react";
import fire from '../../../assets/fire.png';
import '../Movielist/movielist.css';
import MovieCard from "../Movielist/MovieCard";

const MovieList = () => {
  return (
    <section className="movie-list">
        <header className="movie-list-header">
            <h2 className="movie-list-title">Popular <img src={fire} alt="Fire" className="movie-list-icon" /></h2>
        <div className="movie-list-fs">
            <ul className="movieFilter">
                <li className="movie_filter_item">8 + Star</li>
                <li className="movie_filter_item">7 + Star</li>
                <li className="movie_filter_item">6 + Star</li>
            </ul>
            <select name="sort" id="" className="sort_option">
                <option value="highest">Sortby</option>
                <option value="lowest">Date</option>
                <option value="popular">Rate</option>
            </select>
            <select name="" id="" className="movie_sorting">
                <option>ascending</option>
                <option>descending</option>
            </select>
        </div>
        </header>
        <div className="movie_Cards">
            <MovieCard />
        </div>
    </section>



    
  );
};

export default MovieList;
