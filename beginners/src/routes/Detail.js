import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../componets/Movie";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    console.log(movie);
  };

  return movie != null ? (
    <div>
      <h1>{movie.title_long}</h1>
      <img
        src={movie.large_cover_image}
        style={{ width: "200px" }}
        alt={movie.title}
      />
      <h4>{movie.year}</h4>
      <ul style={{ display: "flex" }}>
        {movie.genres.map((gen, index) => (
          <li key={index} style={{ marginRight: "40px" }}>
            {gen}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Detail;
