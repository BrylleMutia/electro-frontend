import React from "react";
import styles from "./RatingBar.module.scss";

import Rating from "@material-ui/lab/Rating";
import { RatingProgress } from "../../../../StyledComponents";

interface Props {
  rating: number;
  percentage: number;
}

const RatingBar: React.FC<Props> = ({ rating, percentage }) => {
  return (
    <div>
      <Rating name="disabled" value={rating} readOnly />
      <RatingProgress variant="determinate" value={percentage} />
    </div>
  );
};

export default RatingBar;
