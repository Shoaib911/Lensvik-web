import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const location = useLocation();

    return (
        <>
            {/* Navbar */}
            <div className='flex items-center justify-between pt-5 pb-1 font-medium'>
                <Link to='/'>
                    <img src={assets.logo} className='w-40' alt="Lensvik" />
                </Link>
                <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
                    <NavLink to='/' className='flex flex-col items-center gap-1'>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                        <p>COLLECTION</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>
                <div className='flex items-center gap-6'>
                    <img 
                         onClick={() => {
                            // Prevent showing duplicate search bar on mobile
                            if (window.innerWidth >= 640) { // 640px is 'sm' in Tailwind
                                setShowSearch(true);
                            }
                        }} 
                        src={assets.search_icon} 
                        className='w-5 cursor-pointer' 
                        alt="Search Products" 
                    />
                    <div className='relative group'>
                        <Link to='/login'>
                            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Your Profile" />
                        </Link>
                        <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
                            <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                                <p className='cursor-pointer hover:text-black'>Profile</p>
                                <p className='cursor-pointer hover:text-black'>Orders</p>
                                <p className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon" />
                </div>
            </div>

            {/* SearchBar BELOW Navbar for Mobile */}
            {location.pathname === "/" && (
                <div className="sm:hidden w-full px-4 mt-2">
                    <SearchBar alwaysVisible={true} />
                </div>
            )}

            {/* Sidebar menu for smaller screens */}
            <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all ${visible ? 'w-4/5 sm:w-1/4' : 'w-0'} overflow-hidden shadow-lg z-50`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </>
    );
};

export default NavBar;
