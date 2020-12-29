import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useRouteMatch, Route, NavLink, useParams } from "react-router-dom";
import { lazy } from "react";

import styles from "./MovieDetailsPage.module.css";

const FilmDetails = ({ currentFilm }) => {
  const Cast = lazy(() => import("../Cast//Cast"));
  const Reviews = lazy(() => import("../Reviews/Reviews"));
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const baseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <img
        className={styles.image}
        width="300"
        height="600"
        alt={currentFilm.title}
        src={`${baseURL}${currentFilm.poster_path}`}
      />

      <div className={styles.info}>
        <h2>
          {currentFilm.title}
          <span>{`(${currentFilm.release_date.slice(0, 4)})`}</span>
        </h2>
        <p>User score {`${(currentFilm.vote_average * 10).toFixed()} %`}</p>
        <h3>Overview</h3>
        <p>{currentFilm.overview}</p>
        <h3>Genres</h3>
        <ul>
          {currentFilm.genres.map((genre) => (
            <li key={uuidv4()}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <h3>Additional information</h3>
      <ul>
        <li key={uuidv4()}>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li key={uuidv4()}>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>

      <Route path={`${path}/cast`}>
        {currentFilm && <Cast id={movieId} />}
      </Route>

      <Route path={`${path}/reviews`}>
        {currentFilm && <Reviews id={movieId} />}
      </Route>
    </div>
  );
};

FilmDetails.propTypes = {
  currentFilm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array,
  }),
};

export default FilmDetails;
