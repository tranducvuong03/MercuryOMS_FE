import React from "react"
import type { Review } from "../../types/review"
import { FaUser } from "react-icons/fa"
import StarRating from "./StarRating"

interface Props {
  review: Review
}

const ReviewItem: React.FC<Props> = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {review.avatar ? (
            <img src={review.avatar} alt={review.author} style={{ width: 25, height: 25, borderRadius: "50%", marginRight: 8 }} />
          ) : (
            <div style={{ width: 25, height: 25, borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
              <FaUser size={12} />
            </div>
          )}
          <span>{review.author}</span>
        </div>
        <span>{review.date}</span>
      </div>

      <div className="review-rating">
        <StarRating rating={review.rating} />
      </div>

      <p>{review.comment}</p>

      {review.images && review.images.length > 0 && (
        <div style={{ display: "flex", marginTop: 8, gap: 8, flexWrap: "wrap" }}>
          {review.images.map((img: string | undefined, i: React.Key | null | undefined) => (
            <img key={i} src={img} alt="review" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, cursor: "pointer" }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewItem
