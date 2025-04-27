import { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { placeOrder } = useContext(ShopContext);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("user");

  const handlePlaceOrder = () => {
    const address = {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      mobile,
    };

    // Save address and payment method temporarily
    localStorage.setItem("shippingAddress", JSON.stringify(address));
    localStorage.setItem("paymentMethod", method);

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/orders");
      navigate("/login");
    } else {
      placeOrder(navigate);
    }
  };

  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side Content */}
      <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
        <div className='my-3 text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='First Name'
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='Last Name'
          />
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="email"
          placeholder='Email Address'
        />
        <input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="text"
          placeholder='Street'
        />
        <div className='flex gap-3'>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='City'
          />
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='State'
          />
        </div>
        <div className='flex gap-3'>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="number"
            placeholder='Zip Code'
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            type="text"
            placeholder='Country'
          />
        </div>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          type="number"
          placeholder='Mobile'
        />
      </div>

      {/* Right Side Content */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        {/* Payment Methods Selection */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="RazorPay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className='w-full mt-8 text-end'>
            <button
              onClick={handlePlaceOrder}
              className='px-16 py-3 text-sm text-white bg-black active:bg-gray-800'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
