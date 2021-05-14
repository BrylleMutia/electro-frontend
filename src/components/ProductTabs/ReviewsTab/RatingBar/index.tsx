import React from "react";
import styles from "./RatingBar.module.scss";

import Rating from "@material-ui/lab/Rating";
import { RatingProgress } from "../../../StyledComponents";

interface Props {
  rating: number;
  percentage: number;
  occurence: number;
}

const RatingBar: React.FC<Props> = ({ rating, percentage, occurence }) => {
  return (
    <div className={styles.rating_bar}>
      <Rating className={styles.mr_md} name="disabled" value={rating} readOnly />
      <RatingProgress variant="determinate" value={percentage} />
      <span className={styles.occurence}>{occurence}</span>
    </div>
  );
};

export default RatingBar;
