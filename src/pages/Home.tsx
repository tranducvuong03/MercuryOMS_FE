import { useEffect } from "react"
import Banner from "../components/Banner/Banner"
import Category from "../components/Category/Category"
import FlashSale from "../components/FlashSale/FlashSale"
import ProductSection from "../components/Product/ProductSection"

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <main className="main">
      <Banner />
      <Category />
      <FlashSale />
      <ProductSection />
    </main>
  )
}

export default Home
