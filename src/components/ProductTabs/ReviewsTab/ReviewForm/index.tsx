import React, { useState } from "react";
import styles from "./ReviewForm.module.scss";
import { submitProductReview } from "../../../../redux/shop/shopSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { useParams, Link } from "react-router-dom";

import Rating from "@material-ui/lab/Rating";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

export interface ReviewInfo {
  rating: number;
  feedback: string;
  product_id: number | string;
}

interface RouteParams {
  product_id: string;
}

interface Props {
  isHidden: boolean;
}

const ReviewForm: React.FC<Props> = ({ isHidden }) => {
  const [reviewScore, setReviewScore] = useState<number | null>(0);
  const [feedback, setFeedback] = useState<string>("");

  const dispatch = useAppDispatch();
  const { product_id } = useParams<RouteParams>();

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value);

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reviewScore) {
      let newProductReview: ReviewInfo = {
        product_id,
        rating: reviewScore,
        feedback,
      };

      dispatch(submitProductReview(newProductReview));
    }
  };

  if (isHidden)
    return (
      <div className={styles.review_form}>
        <h4 className={styles.header}>Leave a review</h4>
        <Alert severity="info">
          To leave a review, please <Link to="/auth">register</Link> or <Link to="/auth">login</Link> first.
        </Alert>
      </div>
    );

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

      <form onSubmit={handleReviewSubmit}>
        <div className={styles.review}>
          <label htmlFor="review">Review</label>
          <TextareaAutosize required id="review" aria-label="empty textarea" rowsMin={3} placeholder="Message" onChange={handleFeedbackChange} value={feedback} />
        </div>

        <Button type="submit" size="small" disableElevation variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
