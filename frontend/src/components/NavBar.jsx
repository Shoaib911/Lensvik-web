import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';


const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null); 
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Check if user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

    useEffect(() => {
        // Update login state when component loads
        setIsLoggedIn(!!localStorage.getItem("user"));
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user session
        setIsLoggedIn(false); // Update state
        navigate('/login'); // Redirect to login page
    };

    // Category & Subcategory Data
    const categories = [
        { 
            name: 'MEN GLASSES', 
            subcategories: ['Full Rim', 'Half Rim', 'Rimless', 'Blue Light Blocking', 'Progressive Lenses', 'Reading Glasses'] 
        },
        { 
            name: 'WOMEN GLASSES', 
            subcategories: ['Full Rim', 'Half Rim', 'Rimless', 'Blue Light Blocking', 'Progressive Lenses', 'Reading Glasses'] 
        },
        { 
            name: 'KIDS GLASSES', 
            subcategories: ['Prescription', 'Sunglasses', 'Blue Light Glasses'] 
        },
        { 
            name: 'SUNGLASSES', 
            subcategories: ['Polarized', 'Non-Polarized', 'Aviators', 'Wayfarer', 'Rounded', 'Sports Sunglasses'] 
        },
        { 
            name: 'INTELLIGENT GLASSES', 
            subcategories: ['Smart Lenses', 'Blue Light Filter'] 
        },
        { 
            name: 'LENSES', 
            subcategories: ['Multifocal', 'Daily Disposable', 'Monthly Disposable', 'Colored Lenses', 'Toric (Astigmatism)'] 
        },
        { 
            name: 'ACCESSORIES', 
            subcategories: ['Cases', 'Cleaning Kits', 'Lens Wipes', 'Anti-Fog Solutions'] 
        }
    ];

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
                            if (window.innerWidth >= 640) { // 640px is 'sm' in Tailwind
                                setShowSearch(true);
                            }
                        }} 
                        src={assets.search_icon} 
                        className='w-5 cursor-pointer' 
                        alt="Search Products" 
                    />

                    {/* Profile Section */}
                    <div 
                        className='relative z-50'
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
                        {isDropdownOpen && (
                            <div className='absolute right-0 pt-4 dropdown-menu'>
                                <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100 shadow-lg'>
                                    <Link to="/profile" className='hover:text-black'>Profile</Link>
                                    <Link to="/orders" className='hover:text-black'>Orders</Link>
                                    {isLoggedIn ? (
                                        <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                                    ) : (
                                        <Link to="/login" className='hover:text-black'>Login</Link>
                                    )}
                                </div>
                            </div>
                        )}
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

                    {/* Categories Dropdown */}
                    {categories.map((category, index) => (
                        <div key={index}>
                            <div 
                                className='flex justify-start items-center py-2 pl-6 border cursor-pointer' 
                                onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                            >
                                <p>{category.name}</p>
                                <img 
                                    src={assets.dropdown_icon} 
                                    className={`h-3 transition-transform ml-3${expandedCategory === index ? 'rotate-180' : ''}`} 
                                    alt="Expand" 
                                />
                            </div>

                            {/* Subcategories */}
                            {expandedCategory === index && (
                                <div className='flex flex-col bg-gray-50'>
                                    {category.subcategories.map((sub, subIndex) => (
                                        <NavLink 
                                            key={subIndex} 
                                            onClick={() => setVisible(false)} 
                                            className='py-2 pl-10 text-sm border-b' 
                                            to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                                        >
                                            {sub}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/findyoursize'>
  FIND YOUR FIT
</NavLink>


<NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

                </div>
            </div>
        </>
    );
};

export default NavBar;
