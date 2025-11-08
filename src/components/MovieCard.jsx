import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  let posterURL;
  if (movie.poster_path === null) {
    posterURL = "https://placehold.co/200x300?text=No%20Poster%20Available";
  } else {
    posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

  return (
    <Link
      to={`/movies/${movie.id}/details`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-neutral-700 bg-neutral-900/50 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/30"
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden">
        <img
          src={posterURL}
          alt={`Poster for ${movie.title}`}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Movie Info */}
      <div className="flex grow flex-col justify-between p-3">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-200 transition-colors group-hover:text-blue-300">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="rounded-full bg-neutral-800/80 px-2 py-1">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </span>
          {movie.vote_average > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-600/20 px-2 py-1 text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
