import API from "../../Services/getData";

import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const [popMovies, setPopMovies] = useState([]);

  useEffect(() => API.getPopularMovies().then((res) => setPopMovies(res)), []);

  return (
    <ul>
      {popMovies &&
        popMovies.map((movie) => (
          <li key={uuidv4()}>
            <Link
              to={{
                pathname: `${url}movies/${movie.id}`,
                state: {
                  from: {
                    location,
                  },
                },
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default HomePage;
