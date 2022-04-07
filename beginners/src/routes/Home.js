import { useEffect, useState } from "react";
import Movie from "../componets/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?sort_by=year&minimum_rating=8&quality=1080p"
      )
    ).json();

    setMovies(Array.from(new Set(json.data.movies)));
    setLoading(false);
  };

  useEffect(() => getMovie(), []);
  console.log(movies);

  return (
    <div>
      <title>Movie List</title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.map((movie, index) => (
            <Movie
              key={movie.id + Math.random().toString(36).substr(2, 11)}
              genres={movie.genres}
              id={movie.id}
              index={index}
              large_cover_image={movie.large_cover_image}
              title={movie.title}
              title_long={movie.title_long}
              year={movie.year}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
