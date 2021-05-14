import React, { useState } from "react";
import styles from "./ReviewForm.module.scss";

import Rating from "@material-ui/lab/Rating";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

function ReviewForm() {
  const [reviewScore, setReviewScore] = useState<number | null>(0);

  return (
    <div className={styles.review_form}>
      <h4 className={styles.header}>Leave a review</h4>

      <div className={styles.rating}>
        <p>Rating</p>
        <Rating
          value={reviewScore}
          onChange={(event, newValue) => {
            setReviewScore(newValue);
          }}
        />
      </div>

      <form>
        <div className={styles.review}>
          <label htmlFor="review">Review</label>
          <TextareaAutosize id="review" aria-label="empty textarea" rowsMin={3} placeholder="Message" />
        </div>

        <Button type="submit" size="small" disableElevation variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default ReviewForm;
