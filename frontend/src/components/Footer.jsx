import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <Link to='/'>
                    <img src={assets.logo} className='w-32 mb-5 cursor-pointer' alt="Lensvik" />
                </Link>
                <p className="w-full text-gray-600 md:w-2/3">
                    At Lensvik, we are committed to providing high-quality eyewear that blends style, comfort, and innovation.
                    Explore our collection of prescription glasses, sunglasses, and contact lenses designed to fit your unique needs.
                    Follow us for exclusive offers, the latest trends, and expert eye care tips. Need assistance? Our support team is here to help!
                    Subscribe to our newsletter for special discounts and updates on new arrivals.
                </p>
         </div>

            <div>
                <p className='mb-5 text-xl font-medium'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/contact'>
                        <li>About Us</li>
                    </Link>
                    <Link to='/contact'>
                        <li>Delivery</li>
                    </Link>
                    <Link to='/contact'>
                        <li>Privacy & Policy</li>
                    </Link>
                </ul>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+11-558-669-447</li>
                    <li>support@lensvik.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 Lensvik. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
