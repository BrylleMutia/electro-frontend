import React from 'react'
import { ReviewInterface } from "../../../../redux/types"

interface Props {
  reviewDetails: ReviewInterface
}

const Review: React.FC<Props> = ({ reviewDetails }) => {
  const { feedback } = reviewDetails;

  return (
    <div>
      {feedback}
    </div>
  )
}

export default Review
