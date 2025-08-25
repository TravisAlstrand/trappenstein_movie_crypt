import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import {
  handleAddMovieToWatchlist,
  checkIfMovieIsInWatchlist,
  handleRemoveMovieFromWatchlist,
} from "../../utils/supabaseFunctions";

import "./MovieDetailsPage.css";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetailsPage = () => {
  const { user } = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [presentInWatchlist, setPresentInWatchlist] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  // FETCH THE REQUESTED MOVIE DATA
  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US'&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovie(data);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const checkWatchList = async () => {
      if (user && movie) {
        const result = await checkIfMovieIsInWatchlist(user.id, movie.id);
        setPresentInWatchlist(!!result);
      }
    };

    checkWatchList();
  }, [user, movie]);

  const handleAddButton = async () => {
    const movieData = {
      movie_id: movie.id,
      movie_title: movie.title,
      release_date: movie.release_date,
      poster_url: movie.poster_path,
    };

    try {
      const addedData = await handleAddMovieToWatchlist(movieData);
      if (addedData.data) {
        setPresentInWatchlist(true);
      } else if (addedData.error) {
        setError(addedData.error.message);
      }
    } catch (err) {
      setError(err.message);
      return;
    }
  };

  const handleRemoveButton = async () => {
    try {
      const removedData = await handleRemoveMovieFromWatchlist(
        user.id,
        movie.id
      );
      if (removedData) {
        setPresentInWatchlist(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!movie) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={`Movie poster for ${movie.title}`}
      />
      <h1>{movie.title}</h1>
      <p>{movie.release_date.split("-")[0]}</p>
      <p>
        <em>{movie.tagline}</em>
      </p>
      <div>
        {movie.genres.length ? (
          movie.genres.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index !== movie.genres.length - 1 && " - "}
            </span>
          ))
        ) : (
          <></>
        )}
      </div>
      <p>{movie.overview}</p>
      {presentInWatchlist ? (
        <button type="button" onClick={handleRemoveButton}>
          Remove from Watchlist
        </button>
      ) : (
        <button type="button" onClick={handleAddButton}>
          Add to Watchlist
        </button>
      )}

      {error ? <p style={{ color: "red" }}>{error}</p> : <></>}
    </main>
  );
};

export default MovieDetailsPage;
