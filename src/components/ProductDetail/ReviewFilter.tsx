import React from "react"

type Filter = "all" | "with-images" | number

interface Props {
    value: Filter
    onChange: (f: Filter) => void
}

const ReviewFilter: React.FC<Props> = ({ value, onChange }) => {
    const starOptions = [5, 4, 3, 2, 1]

    return (
        <div className="review-filter">
            <button
                type="button"
                className={`filter-btn ${value === "all" ? "active" : ""}`}
                aria-pressed={value === "all"}
                onClick={() => onChange("all")}
            >
                Tất cả
            </button>

            <button
                type="button"
                className={`filter-btn ${value === "with-images" ? "active" : ""}`}
                aria-pressed={value === "with-images"}
                onClick={() => onChange("with-images")}
            >
                Có ảnh
            </button>

            {starOptions.map(s => (
                <button
                    key={s}
                    type="button"
                    className={`filter-btn ${value === s ? "active" : ""}`}
                    aria-pressed={value === s}
                    onClick={() => onChange(s)}
                >
                    {s}★
                </button>
            ))}
        </div>
    )
}

export type { Filter }
export default ReviewFilter
