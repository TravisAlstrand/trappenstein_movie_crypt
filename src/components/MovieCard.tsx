import { Link } from "react-router-dom";

export default function MovieCard({ movie, linkToDetails = true, children }) {
  const id = movie.movie_id || movie.id; // handle Supabase row or TMDB object
  const title = movie.movie_title || movie.title;
  const poster = movie.poster_url || movie.poster_path;

  const content = (
    <div style={{ width: "150px" }}>
      {poster && (
        <img
          src={
            poster.startsWith("http")
              ? poster
              : `https://image.tmdb.org/t/p/w300${poster}`
          }
          alt={title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      )}
      <p>{title}</p>
      {children}
    </div>
  );

  return linkToDetails ? <Link to={`/movie/${id}`}>{content}</Link> : content;
}
