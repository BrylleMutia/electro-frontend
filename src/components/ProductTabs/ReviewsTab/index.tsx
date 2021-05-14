import React, { useEffect } from "react";
import styles from "./ReviewsTab.module.scss";
import { useAppSelector } from "../../../redux/hooks";

import Review from "./Review";
import RatingBar from "./Review/RatingBar";

function ReviewsTab() {
  const { reviews } = useAppSelector((state) => state.shop.currentProduct);

  const getAverageRating = () => {
    if (reviews) {
      const totalRating = reviews?.reduce((total, current) => (total = total + current.rating), 0);
      return (totalRating / reviews?.length).toPrecision(2);
    }
  };

  const getRatingPercentages = () => {
    // get occurence percentage of each rating on all reviews
    // data needed for rating bar

    let ratingPercentages = [];

    for (let i = 1; i <= 5; i++) {
      let totalOccurrence = 0;

      reviews?.forEach((review) => {
        if (review.rating == i) totalOccurrence++;
      });
      ratingPercentages.push(getPercentage(totalOccurrence));
    }

    // reverse the array bc ratings must render in descending order
    return ratingPercentages.reverse();
  };

  const getPercentage = (ratingOccurence: number) => {
    // percentage of current rating from the overall number of ratings
    // ex. product may have 80% 4-star ratings and 20% 3-star.

    if (reviews?.length) {
      return (ratingOccurence / reviews?.length) * 100;
    } else return 0;
  };

  useEffect(() => {
    getRatingPercentages();
  }, []);


  if (!reviews?.length) return <h4>No reviews</h4>;

  return (
    <div>
      <h5>Based on {reviews?.length} reviews</h5>

      <div className={styles.rating_container}>
        <div className={styles.rating}>{getAverageRating()}</div>
        <div className={styles.overall}>Overall</div>
      </div>

      {getRatingPercentages().map((ratingPercentage, index) => (
        <RatingBar rating={5 - index} key={index} percentage={ratingPercentage} />
      ))}

      {reviews?.map((review, index) => (
        <Review reviewDetails={review} key={index} />
      ))}
    </div>
  );
}

export default ReviewsTab;
