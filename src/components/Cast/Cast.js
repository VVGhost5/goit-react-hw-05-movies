import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import API from "../../Services/getData";

import styles from "./Cast.module.css";

const Cast = ({ id }) => {
  const [actors, setActors] = useState([]);

  useEffect(() => API.getCredits(id).then((res) => setActors(res)), []);

  return (
    <section>
      {actors && (
        <ul>
          {actors.map((actor) => {
            const { name, profile_path, character } = actor;
            const fallback =
              "http://hope.be/wp-content/uploads/2015/05/no-user-image.gif";
            return (
              <li key={uuidv4()} className={styles.list_item}>
                <img
                  width="100"
                  height="200"
                  alt={name}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : fallback
                  }
                />
                <p className={styles.name}>{name}</p>
                <p>{`Character: ${character}`}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

Cast.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Cast;
