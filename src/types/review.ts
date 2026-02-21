export interface Review {
  id: number
  author: string
  avatar?: string
  rating: number
  comment: string
  date: string
  images?: string[]
}