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
        className="w-full max-w-[200px] rounded-t-lg shadow-2xl transition-transform duration-300 hover:scale-110"
      />
      <div className="h-full w-full max-w-[200px] rounded-b-lg bg-neutral-700 px-2 py-4 text-center text-sm text-white">
        <p className="truncate">{movie.title}</p>
        <p>({movie.release_date.split("-")[0]})</p>
      </div>
    </Link>
  );
};

export default MovieCard;
