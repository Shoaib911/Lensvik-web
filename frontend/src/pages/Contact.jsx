
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div>
      {/* Page Title of contact page*/}
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* 📍 Contact Information Section */}
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28 px-4 md:px-16'>
        {/* Contact Image */}
        <img className='w-full md:max-w-[450px] rounded-lg shadow-md' src={assets.contact_img} alt="Contact" />

        {/* Contact Details */}
        <div className='flex flex-col items-start justify-center gap-6 text-gray-700'>
          {/* Customer Support */}
          <div>
            <p className='text-xl font-semibold text-gray-800'>Customer Support</p>
            <p className='text-gray-600 mt-2'>
              Need help? Our support team is available 24/7 to assist you with orders, returns, and product inquiries.
            </p>
            <p className='text-gray-600 mt-1'>
              📞 <strong>1800-111-222</strong> (Toll-Free) <br />
              ✉️ <strong>support@lensvik.com</strong>
            </p>
          </div>

          {/* Store Address */}
          <div>
            <p className='text-xl font-semibold text-gray-800'>Our Store</p>
            <p className='text-gray-600 mt-2'>
              Lensvik HQ <br />
              354 Vision Lane, New York, NY 10001, USA
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className='text-xl font-semibold text-gray-800'>Careers at Lensvik</p>
            <p className='text-gray-600 mt-2'>
              Want to be a part of our growing team? Explore job openings and shape the future of eyewear.
            </p>
            <button className='mt-3 px-6 py-3 text-sm transition-all duration-500 border border-black rounded-md hover:bg-gray-800 hover:text-white'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* 📜 Help & FAQ Section */}
      <div className='bg-gray-100 py-12 px-6 md:px-16 text-center'>
        <p className='text-2xl font-semibold text-gray-800 mb-4'>Need More Help?</p>
        <p className='text-gray-600 text-lg mb-6'>
          Visit our <strong>FAQs</strong> for common questions or chat with our support team for immediate assistance.
        </p>
        <button className='px-8 py-4 text-sm font-medium transition-all duration-500 border border-black rounded-md hover:bg-gray-800 hover:text-white'>
          View FAQs
        </button>
      </div>

      {/* 📩 Newsletter Subscription */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
