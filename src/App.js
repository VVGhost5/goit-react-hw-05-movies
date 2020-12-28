import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Loading from "./components/Loading/Loading.js";

const Navigation = lazy(() => import("./components/Navigation/Navigation.js"));
const HomePage = lazy(() => import("./components/HomePage/HomePage.js"));
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage.js")
);
const NotFoundPage = lazy(() =>
  import("./components/NotFoundPage/NotFoundPage.js")
);
const MoviePage = lazy(() => import("./components/MoviesPage/MoviesPage.js"));

const App = () => {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
