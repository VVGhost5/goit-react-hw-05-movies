import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../../Services/getData";

import styles from "./MoviePage.module.css";

const MoviePage = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      toast.error("Enter your request");
      return;
    }
    API.getMovies(query).then((res) => setMovies(res));
    setQuery("");
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="movies"
          type="text"
          value={query}
          placeholder="Find movies"
          onChange={handleQueryChange}
        ></input>
        <button>Search</button>
      </form>
      {movies && (
        <ul>
          {movies.map((movie) => {
            return (
              <li key={uuidv4()}>
                <Link
                  to={{
                    pathname: `${url}/${movie.id}`,
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
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default MoviePage;
