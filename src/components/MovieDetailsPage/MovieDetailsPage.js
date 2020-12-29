import API from "../../Services/getData";

import styles from "./MovieDetailsPage.module.css";

import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

import Loading from "../Loading/Loading";

const NotFoundPage = lazy(() => import("../NotFoundPage//NotFoundPage"));
const FilmDetails = lazy(() => import("../MovieDetailsPage/FilmsDetails"));

const MovieDetailsPage = () => {
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
        <button
          type="button"
          onClick={onGoBack}
          className={styles.buttonGoBack}
        >
          Go back
        </button>

        {currentFilm && Object.keys(currentFilm).length > 0 ? (
          <FilmDetails currentFilm={currentFilm} />
        ) : (
          <NotFoundPage />
        )}

        {/* <Route path={`${path}/cast`}>
          {currentFilm && <Cast id={movieId} />}
        </Route>

        <Route path={`${path}/reviews`}>
          {currentFilm && <Reviews id={movieId} />}
        </Route> */}
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
