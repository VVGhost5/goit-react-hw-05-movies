import { v4 as uuidv4 } from "uuid";
import API from "../../Services/getData";

import styles from "./MovieDetailsPage.module.css";

import {
  useRouteMatch,
  Route,
  useParams,
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

import Loading from "../Loading/Loading";

const Cast = lazy(() => import("../Cast//Cast"));
const Reviews = lazy(() => import("../Reviews/Reviews"));

const MovieDetailsPage = () => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();

  const [currentFilm, setCurrentFilm] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    API.getMovieDetails(movieId).then((res) => {
      setCurrentFilm(res);
      setShowLoading(false);
    });
  }, []);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/");
  };

  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <NavLink
          className={styles.buttonGoBack}
          to={}
        >
          Go back
        </NavLink> */}
        <button
          type="button"
          onClick={onGoBack}
          className={styles.buttonGoBack}
        >
          Go back
        </button>

        {currentFilm && Object.keys(currentFilm).length > 0 ? (
          <div>
            <img
              className={styles.image}
              width="300"
              height="600"
              alt={currentFilm.title}
              src={`https://image.tmdb.org/t/p/w500${currentFilm.poster_path}`}
            />

            <div className={styles.info}>
              <h2>
                {currentFilm.title}
                <span>{`(${currentFilm.release_date.slice(0, 4)})`}</span>
              </h2>
              <p>
                User score {`${(currentFilm.vote_average * 10).toFixed()} %`}
              </p>
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
        ) : (
          <h2> 404 Oops...something went wrong</h2>
        )}
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
