import React, { useEffect, useState } from "react"
import type {Product } from "../../types/product"
import type { Review } from "../../types/review"
import "./ReviewsSection.css"
import ImageUpload from "./ImageUpload"
import ReviewItem from "./ReviewItem"
import Pagination from "../Pagination/Pagination"
import ReviewFilter from "./ReviewFilter"
import type { Filter } from "./ReviewFilter"

interface Props {
  product: Product
}

const ReviewsSection: React.FC<Props> = ({ product }) => {
  const [reviews, setReviews] = useState<Review[]>(product.reviews || [])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 5
    const [filter, setFilter] = useState<Filter>("all")

    // compute filtered reviews
    const filteredReviews = reviews.filter(r => {
      if (filter === "all") return true
      if (filter === "with-images") return !!(r.images && r.images.length > 0)
      if (typeof filter === "number") return r.rating === filter
      return true
    })

    const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize))
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages, filteredReviews.length])

  const [newReview, setNewReview] = useState<{
    rating: number
    comment: string
    images: File[]
  }>({
    rating: 5,
    comment: "",
    images: []
  })

  // image upload is delegated to ImageUpload component

  const handleAddReview = () => {
    if (!newReview.comment.trim()) return

    // create object URLs for images (persist for session)
    const imageUrls = newReview.images.map(f => URL.createObjectURL(f))

    const reviewToAdd: Review = {
      id: Date.now(),
      author: "Bạn",
      avatar: "",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString("vi-VN"),
      images: imageUrls
    }

    setReviews([reviewToAdd, ...reviews])

    setNewReview({
      rating: 5,
      comment: "",
      images: []
    })
    setCurrentPage(1)
  }

  useEffect(() => {
    // reset page when filter changes
    setCurrentPage(1)
  }, [filter])

  return (
    <div className="reviews-section">
      <h2>Đánh giá sản phẩm</h2>

      <div className="add-review-box">
        <h3>Chia sẻ đánh giá của bạn</h3>

        <div className="review-form">
          {/* Rating */}
          <div className="rating-input">
            <label>Đánh giá:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  onClick={() =>
                    setNewReview({ ...newReview, rating: star })
                  }
                  className={`star ${
                    star <= newReview.rating ? "active" : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="comment-input">
            <label>Bình luận:</label>
            <textarea
              value={newReview.comment}
              onChange={e =>
                setNewReview({
                  ...newReview,
                  comment: e.target.value
                })
              }
              placeholder="Viết bình luận của bạn..."
              rows={4}
            />
          </div>

          {/* Upload ảnh */}
          <ImageUpload files={newReview.images} onChange={(files) => setNewReview({ ...newReview, images: files })} />

          <button
            onClick={handleAddReview}
            className="submit-review-btn"
          >
            Gửi đánh giá
          </button>
        </div>
      </div>

      {/* Review Filter */}
      <ReviewFilter value={filter} onChange={(f) => setFilter(f)} />

      {/* Review List */}
      <div className="reviews-list">
        {filteredReviews.length > 0 ? (
          (() => {
            const start = (currentPage - 1) * pageSize
            const end = start + pageSize
            return filteredReviews.slice(start, end).map(review => (
              <ReviewItem key={review.id} review={review} />
            ))
          })()
        ) : (
          <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        )}
      </div>

      {filteredReviews.length > pageSize && (
        <div style={{ marginTop: 12 }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(p) => setCurrentPage(p)}
            showPageNumbers={true}
            label={`Trang ${currentPage} / ${totalPages}`}
          />
        </div>
      )}
    </div>
  )
}

export default ReviewsSection