import React, { useState } from "react";
import "./App.css";
import Row from "./Row";
import requests from "./request";
import Banner from "./Banner";
import Nav from "./Nav";
import YouTube from "react-youtube";

function App() {
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleTrailer = (url) => {
    // If the same movie is clicked again, close it.
    // If a NEW movie is clicked, the state updates and the SINGLE player swaps videos.
    if (trailerUrl === url) {
      setTrailerUrl("");
    } else {
      setTrailerUrl(url);
    }
  };

  return (
    <div className="App">
      <Nav />
      <Banner />

      {/* We pass the handleTrailer function to EVERY row */}
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} onMovieClick={handleTrailer} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieClick={handleTrailer} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onMovieClick={handleTrailer} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onMovieClick={handleTrailer} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onMovieClick={handleTrailer} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onMovieClick={handleTrailer} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onMovieClick={handleTrailer} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onMovieClick={handleTrailer} />

      {/* ✅ THIS IS THE MAGIC: Only one player exists in the entire app */}
      {trailerUrl && (
        <div className="app__trailer">
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default App;