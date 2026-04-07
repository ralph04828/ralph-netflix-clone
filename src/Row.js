import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/";

function Row({ title, fetchUrl, isLargeRow, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const API_KEY = "03bca0445af66966a09681ad2543953f";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    try {
      const type = movie.first_air_date || isLargeRow ? "tv" : "movie";
      const videoData = await axios.get(
        `/${type}/${movie.id}/videos?api_key=${API_KEY}`
      );

      const trailer = videoData.data.results.find(
        (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
      );

      if (trailer) {
        // We "shout" the URL up to the App.js parent
        onMovieClick(trailer.key);
      } else {
        alert("No trailer available for this title.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={
              isLargeRow
                ? movie.poster_path ? `${base_url}w500${movie.poster_path}` : "/no-image.png"
                : movie.backdrop_path ? `${base_url}w780${movie.backdrop_path}` : "/no-image.png"
            }
            alt={movie.name || movie.title}
          />
        ))}
      </div>
      {/* ❌ DO NOT PUT THE YOUTUBE COMPONENT HERE ❌ */}
    </div>
  );
}

export default Row;