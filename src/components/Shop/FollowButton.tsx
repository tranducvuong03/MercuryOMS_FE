import { useEffect, useState } from "react"

interface Props { shopId: number }

const FollowButton = ({ shopId }: Props) => {
  const [isFollowed, setIsFollowed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("followedShops")
    const arr: number[] = stored ? JSON.parse(stored) : []
    setIsFollowed(arr.includes(shopId))
  }, [shopId])

  const toggle = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const stored = localStorage.getItem("followedShops")
    const arr: number[] = stored ? JSON.parse(stored) : []
    if (isFollowed) {
      const next = arr.filter(id => id !== shopId)
      localStorage.setItem("followedShops", JSON.stringify(next))
      setIsFollowed(false)
      window.dispatchEvent(new CustomEvent('followChanged', { detail: { shopId, followed: false } }))
    } else {
      arr.push(shopId)
      localStorage.setItem("followedShops", JSON.stringify(arr))
      setIsFollowed(true)
      window.dispatchEvent(new CustomEvent('followChanged', { detail: { shopId, followed: true } }))
    }
  }

  return (
    <button className="shop-btn" onClick={toggle}>
      {isFollowed ? "Đã theo dõi" : "Follow"}
    </button>
  )
}

export default FollowButton
