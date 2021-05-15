import React from "react";
import styles from "./Review.module.scss"
import { ReviewInterface } from "../../../../redux/types";

import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";

interface Props {
  reviewDetails: ReviewInterface;
}

const Review: React.FC<Props> = ({ reviewDetails }) => {
  const { feedback, rating, user, updated_at } = reviewDetails;

  return (
    <div className={styles.review}>
      <Rating size="small" className={styles.rating} name="disabled" value={rating} readOnly />
      <p>{feedback}</p>
      <div className={styles.user_details}>
        <Avatar className={styles.avatar} src={user.image} alt={user.name} sizes="10px" />
        <h4>{user.name}</h4>
        <h5>{updated_at.slice(0, 10)}</h5>
      </div>
    </div>
  );
};

export default Review;
