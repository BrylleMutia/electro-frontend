import React from "react";
import styles from "./RatingBar.module.scss";

import { useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { RatingProgress } from "../../../StyledComponents";

interface Props {
  rating: number;
  percentage: number;
  occurence: number;
}

const RatingBar: React.FC<Props> = ({ rating, percentage, occurence }) => {
  const matches = useMediaQuery("(max-width: 420px)");
  
  return (
    <div className={styles.rating_bar}>
      <Rating size={matches ? "small" : "medium"} className={styles.mr_sm} name="disabled" value={rating} readOnly />
      <RatingProgress variant="determinate" value={percentage} />
      <span className={styles.occurence}>{occurence}</span>
    </div>
  );
};

export default RatingBar;
