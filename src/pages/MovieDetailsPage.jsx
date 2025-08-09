import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

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

  return (
    <main>
      <h1>{movie?.title}</h1>
      <p>{movie?.release_date.split("-")[0]}</p>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
        alt={`Movie poster for ${movie?.title}`}
      />
    </main>
  );
};

export default MovieDetailsPage;
