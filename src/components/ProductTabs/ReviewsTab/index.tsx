import React, { useState, useEffect } from "react";
import styles from "./ReviewsTab.module.scss";
import { useAppSelector } from "../../../redux/hooks";
import paginate from "../../../utils/pagination";
import { ReviewInterface } from "../../../redux/types";
import Pagination from "@material-ui/lab/Pagination";

import Review from "./Review";
import RatingBar from "./RatingBar";
import ReviewForm from "./ReviewForm";



type ReviewPageInterface = ReviewInterface[];

function ReviewsTab() {
  const { reviews } = useAppSelector((state) => state.shop.currentProduct);
  const [paginatedReviews, setPaginatedReviews] = useState<ReviewPageInterface[]>([[]]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const getAverageRating = () => {
    if (reviews) {
      const totalRating = reviews?.reduce((total, current) => (total = total + current.rating), 0);
      return (totalRating / reviews?.length).toPrecision(2);
    }
  };

  const getRatingStats = () => {
    // get occurence and percentage of each rating on all reviews
    // data needed for rating bar

    let ratingPercentages = [];

    for (let i = 1; i <= 5; i++) {
      let ratingStats = { occurence: 0, percentage: 0 };

      reviews?.forEach((review) => {
        if (review.rating == i) ratingStats.occurence++;
      });

      ratingStats.percentage = getPercentage(ratingStats.occurence);
      ratingPercentages.push(ratingStats);
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
    getRatingStats();
  }, []);

  useEffect(() => {
    if (reviews?.length) {
      // group products into pages
      // 5 products per page
      const REVIEW_PER_PAGE = 5;

      let groupedReviews: ReviewPageInterface[] = [];
      let groupsNum = Math.floor(reviews.length / REVIEW_PER_PAGE) + 1;

      for (let pageNum = 1; pageNum <= groupsNum; pageNum++) {
        groupedReviews.push(paginate(reviews, pageNum, REVIEW_PER_PAGE));
      }

      setPaginatedReviews(groupedReviews);
    }
  }, []);



  if (!reviews?.length) return <h4>No reviews</h4>;

  return (
    <div className={styles.rating_container}>
      <div className={styles.rating_bar_container}>
        <div className={styles.rating_bar}>
          <h5>Based on {reviews?.length} reviews</h5>

          <div className={styles.rating}>{getAverageRating()}</div>
          <div className={styles.overall}>Overall</div>

          <div>
            {getRatingStats().map((rating, index) => (
              <RatingBar rating={5 - index} key={index} occurence={rating.occurence} percentage={rating.percentage} />
            ))}
          </div>
        </div>

        <ReviewForm />
      </div>

      <div className={styles.reviews}>
        {paginatedReviews[currentPage - 1].map((review, index) => (
          <div className={styles.mb_md}>
            <Review reviewDetails={review} key={index} />
          </div>
        ))}

        <Pagination className={styles.pagination} style={{ display: paginatedReviews.length > 1 ? "" : "none" }} color="primary" count={paginatedReviews.length} page={currentPage} onChange={handlePageChange} />
      </div>
    </div>
  );
}

export default ReviewsTab;
