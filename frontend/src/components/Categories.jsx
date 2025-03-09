import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Categories = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const categoriesDesktop = [
        { name: 'MEN GLASSES', subcategories: ['Full Rim', 'Half Rim', 'Rimless', 'Blue Light Blocking','Progressive Lenses','Reading Glasses'] },
        { name: 'WOMEN GLASSES', subcategories: ['Full Rim', 'Half Rim', 'Rimless', 'Blue Light Blocking','Progressive Lenses','Reading Glasses'] },
        { name: 'KIDS GLASSES', subcategories: ['Prescription', 'Sunglasses', 'Blue LightGlasses'] },
        { name: 'SUNGLASSES', subcategories: ['Polarized', 'Non-Polarized', 'Aviators', 'Wayfarer','Rounded','Sports Sunglasses'] },
        { name: 'INTELLIGENT GLASSES', subcategories: ['Smart Lenses', 'Blue Light Filter'] },
        { name: 'LENSES', subcategories: ['Multifocal','Daily Disposable', 'Monthly Disposable', 'Colored Lenses', 'Toric (Astigmatism)'] },
        { name: 'ACCESSORIES', subcategories: ['Cases', 'Cleaning Kits', 'Lens Wipes','Anti-Fog Solutions'] }
    ];

    // Mobile categories (simplified)
    const categoriesMobile = [
        { name: 'Men Glasses', img: assets.men_glassess },
        { name: 'Women Glasses', img: assets.women_glassess },
        { name: 'Kids Glasses', img: assets.Kid_Glasses },
        { name: 'Sunglasses', img: assets.Sunglasses },
        { name: 'Intelligent Glasses', img: assets.intelligent_glasses },
        { name: 'Lenses', img: assets.lenses },
        { name: 'Accessories', img: assets.accessories }

    ];

    return (
        <div className='pb-3'>
            {/* 📱 Mobile View - Category Boxes */}
            <div className='grid grid-cols-4 gap-2 sm:hidden'>
                {categoriesMobile.map((category, index) => (
                    <Link key={index} to={`/category/${category.name.toLowerCase()}`} className='relative group'>
                        <div className='w-full h-20 bg-gray-100 rounded-lg overflow-hidden shadow-md'>
                            <img src={category.img} alt={category.name} className='w-full h-full object-cover' />
                        </div>
                        <p className='text-xs mt-2 text-center'>{category.name}</p>
                    </Link>
                ))}
            </div>

            {/* 🖥️ Desktop View - Navbar Style */}
            <div className='hidden sm:flex justify-center gap-8 py-4 relative'>
                {categoriesDesktop.map((category, index) => (
                    <div
                        key={index}
                        className='relative group cursor-pointer'
                        onMouseEnter={() => setHoveredCategory(index)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        {/* Main Category Name (Now Clickable) */}
                        <Link 
                            to={`/category/${category.name.toLowerCase()}`} 
                            className='text-sm text-gray-700 font-medium hover:text-black transition-colors block px-3 py-2'
                        >
                            {category.name}
                        </Link>

                        {/* Dropdown Menu for Subcategories */}
                        {hoveredCategory === index && (
                            <div 
                                className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-lg p-5 z-10 border'
                                onMouseEnter={() => setHoveredCategory(index)} 
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <ul className='flex flex-col text-gray-700 text-sm'>
                                    {category.subcategories.map((sub, subIndex) => (
                                        <li key={subIndex} className='py-2 px-4 hover:bg-gray-100 hover:text-black text-center rounded-md'>
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
