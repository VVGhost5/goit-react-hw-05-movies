import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation = () => (
  <section className={styles.section}>
    <nav>
      <NavLink
        className={styles.link}
        activeClassName={styles.active_link}
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.link}
        activeClassName={styles.active_link}
      >
        Movies
      </NavLink>
    </nav>
  </section>
);

export default Navigation;
