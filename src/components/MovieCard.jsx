const MovieCard = ({ movie }) => {
  let posterURL;
  if (movie.poster_path === null) {
    posterURL = "https://placehold.co/200x300?text=No%20Poster%20Available";
  } else {
    posterURL = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  }

  return (
    <div>
      <img src={posterURL} alt={`Poster for ${movie.title}`} />
      <div>
        <span>{movie.title}: </span>
        <span>({movie.release_date.split("-")[0]})</span>
      </div>
    </div>
  );
};

export default MovieCard;
