import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import styles from "./Review.module.css";

import API from "../../Services/getData";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => API.getReviews(id).then((res) => setReviews(res)), []);

  return (
    <section>
      {reviews && reviews.results.length > 0 ? (
        <ul>
          {reviews.results.map((comment) => {
            return (
              <li className={styles.list_item} key={uuidv4()}>
                <p className={styles.author}>{`Author: ${comment.author}`}</p>
                <p className={styles.comment}>{comment.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </section>
  );
};

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Reviews;
