import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Categories = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Desktop categories with subcategories
    const categoriesDesktop = [
        { name: 'Men Glasses', img: assets.hero_img3, subcategories: ['Full Rim', 'Half Rim', 'Rimless', 'Blue Light'] },
        { name: 'Women Glasses', img: assets.hero_img3, subcategories: ['Full Rim', 'Half Rim', 'Rimless', 'Progressive'] },
        { name: 'Kids Glasses', img: assets.hero_img3, subcategories: ['Prescription', 'Sunglasses', 'Blue Light'] },
        { name: 'Sunglasses', img: assets.hero_img3, subcategories: ['Polarized', 'Non-Polarized', 'Aviators', 'Wayfarer'] },
        { name: 'Intelligent Glasses', img: assets.hero_img3, subcategories: ['Smart Lenses', 'Blue Light Filter'] },
        { name: 'Lenses', img: assets.hero_img3, subcategories: ['Daily', 'Monthly', 'Colored', 'Toric'] },
        { name: 'Accessories', img: assets.hero_img3, subcategories: ['Cases', 'Cleaning Kits', 'Lens Wipes'] }
    ];

    // Mobile categories (simplified)
    const categoriesMobile = [
        { name: 'Men', img: assets.hero_img3 },
        { name: 'Women', img: assets.hero_img3 },
        { name: 'Kids', img: assets.hero_img3 },
        { name: 'Sunglasses', img: assets.hero_img3 },
        { name: 'Lenses', img: assets.hero_img3 }
    ];

    return (
        <div className='py-5'>
            {/* Mobile View - 5 Squares */}
            <div className='grid grid-cols-5 gap-2 sm:hidden'>
                {categoriesMobile.map((category, index) => (
                    <Link key={index} to={`/category/${category.name.toLowerCase()}`} className='relative group'>
                        <div className='w-full h-20 bg-gray-100 rounded-lg overflow-hidden shadow-md'>
                            <img src={category.img} alt={category.name} className='w-full h-full object-cover' />
                        </div>
                        <p className='text-xs mt-2 text-center'>{category.name}</p>
                    </Link>
                ))}
            </div>

            {/* Desktop View - 7 Cards with Dropdowns */}
            <div className='hidden sm:flex justify-center gap-12 py-4 relative'>
                {categoriesDesktop.map((category, index) => (
                    <div
                        key={index}
                        className='relative cursor-pointer'
                        onMouseEnter={() => setHoveredCategory(index)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        {/* Main Category Card */}
                        <div className='w-35 h-20 rounded-lg overflow-hidden shadow-md relative'>
                            <img src={category.img} alt={category.name} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' />
                        </div>
                        <p className='text-center mt-2 text-m font-semibold'>{category.name}</p>

                        {/* Dropdown for Subcategories (remains visible on hover) */}
                        {hoveredCategory === index && (
                            <div 
                                className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white shadow-lg rounded-lg pb-4 z-10'
                                onMouseEnter={() => setHoveredCategory(index)} 
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <ul className='flex flex-col items-center text-sm text-gray-700'>
                                    {category.subcategories.map((sub, subIndex) => (
                                        <li key={subIndex} className='py-1 hover:text-black w-full text-center'>
                                            <Link to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase()}`}>{sub}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
