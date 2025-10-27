import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  let posterURL;
  if (movie.poster_path === null) {
    posterURL = "https://placehold.co/200x300?text=No%20Poster%20Available";
  } else {
    posterURL = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  }

  return (
    <Link
      to={`/movies/${movie.id}/details`}
      className="mb-8 flex cursor-pointer flex-col items-center"
    >
      <img
        src={posterURL}
        alt={`Poster for ${movie.title}`}
        className="mb-4 max-w-[200px] rounded-lg shadow-2xl transition-transform hover:scale-110"
      />
      <div className="max-w-[200px] text-center text-white">
        <p className="truncate">{movie.title}</p>
        <p>({movie.release_date.split("-")[0]})</p>
      </div>
    </Link>
  );
};

export default MovieCard;
