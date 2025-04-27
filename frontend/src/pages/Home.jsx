import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OnSale from '../components/OnSale'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Categories from '../components/Categories'
import ReviewSection from '../components/ReviewSection' // ✅

const Home = () => {
  return (
    <div>
      <Categories />
      <Hero />
      <OnSale />
      <LatestCollection />
      <BestSeller />
      <ReviewSection /> {/* ✅ Add Reviews after Best Seller */}
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home;
