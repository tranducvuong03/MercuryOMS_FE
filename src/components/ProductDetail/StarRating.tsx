import React from "react"

interface Props {
  rating: number
  editable?: boolean
  onChange?: (r: number) => void
}

const StarRating: React.FC<Props> = ({ rating, editable = false, onChange }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onClick={() => editable && onChange && onChange(star)}
          className={`star ${star <= rating ? "active" : ""}`}
          style={{ cursor: editable ? "pointer" : "default" }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
