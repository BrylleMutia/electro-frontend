import React from "react";
import styles from "./Review.module.scss";
import { ReviewInterface } from "../../../../redux/shop/types";

import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";

interface Props {
  reviewDetails: ReviewInterface;
  isLoading: boolean;
}

const Review: React.FC<Props> = ({ reviewDetails, isLoading }) => {
  const { feedback, rating, user, updated_at } = reviewDetails;

  return (
    <div className={styles.review}>
      {isLoading ? <Skeleton /> : <Rating size="small" className={styles.rating} name="disabled" value={rating} readOnly />}
      <p>{isLoading ? <Skeleton /> : feedback}</p>
      <div className={styles.user_details}>
        {isLoading ? (
          <Skeleton variant="circle">
            <Avatar className={styles.avatar} src={user.image} alt={user.name} sizes="10px" />
          </Skeleton>
        ) : (
          <Avatar className={styles.avatar} src={user.image} alt={user.name} sizes="10px" />
        )}
        {isLoading ? (
          <Skeleton>
            <h4>{user.name}</h4>
          </Skeleton>
        ) : (
          <h4>{user.name}</h4>
        )}
        {isLoading ? (
          <Skeleton>
            <h5 className={styles.date}>{updated_at.slice(0, 10)}</h5>
          </Skeleton>
        ) : (
          <h5 className={styles.date}>{updated_at.slice(0, 10)}</h5>
        )}
      </div>
    </div>
  );
};

export default Review;
