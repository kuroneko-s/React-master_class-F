import { Link } from "react-router-dom";

function Movie({
  id,
  index,
  title_long,
  large_cover_image,
  title,
  year,
  genres,
}) {
  return (
    <div key={id + `${index}`}>
      <h1>{title_long}</h1>
      <img src={large_cover_image} style={{ width: "200px" }} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <h4>{year}</h4>
      <ul style={{ display: "flex" }}>
        {genres.map((gen, index) => (
          <li key={index} style={{ marginRight: "40px" }}>
            {gen}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movie;
