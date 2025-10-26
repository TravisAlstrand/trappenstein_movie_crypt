import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  let posterURL;
  if (movie.poster_path === null) {
    posterURL = "https://placehold.co/200x300?text=No%20Poster%20Available";
  } else {
    posterURL = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  }

  return (
    <Link to={`/movies/${movie.id}/details`} className="movie-card">
      <img
        src={posterURL}
        alt={`Poster for ${movie.title}`}
        className="card-movie-poster"
      />
      <div className="card-text">
        <p className="card-movie-title">{movie.title}</p>
        <p>({movie.release_date.split("-")[0]})</p>
      </div>
    </Link>
  );
};

export default MovieCard;
