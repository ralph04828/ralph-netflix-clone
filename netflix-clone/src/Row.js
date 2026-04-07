import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const API_KEY = "03bca0445af66966a09681ad2543953f";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const type = isLargeRow ? "tv" : "movie";
        const videoData = await axios.get(
          `/${type}/${movie.id}/videos?api_key=${API_KEY}`,
        );

        const trailer = videoData.data.results.find(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser"),
        );

        if (trailer) {
          setTrailerUrl(trailer.key);
        } else {
          console.log("No official trailer found on TMDB.");
        }
      } catch (error) {
        console.error("Error fetching trailer from TMDB:", error);
      }
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
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title || movie.original_name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
