import a1 from './a1.jpg'
import a12 from './a1.2.jpg'
import a13 from './a1.3.jpg'
import a2 from './a2.jpg'
import a22 from './a2.2.jpg'
import a23 from './a2.3.jpg'
import a3 from './a3.jpg'
import a32 from './a3.2.jpg'
import a33 from './a3.3.jpg'
import a4 from './a4.jpg'
import a42 from './a4.2.jpg'
import a5 from './a5.jpg'
import a52 from './a5.2.jpg'
import a6 from './a6.jpg'
import a62 from './a6.2.jpg'

import c1 from './c1.jpg'
import c12 from './c1.2.jpg'
import c2 from './c2.jpg'
import c22 from './c2.2.jpg'
import c3 from './c3.png'
import c32 from './c3.2.png'


import d1 from './d1.jpg'
import d12 from './d1.2.jpg'
import d13 from './d1.3.jpg'
import d2 from './d2.jpg'
import d3 from './d3.jpg'
import d32 from './d3.2.jpg'
import d33 from './d3.3.jpg'
import d4 from './d4.jpg'
import d42 from './d4.2.jpg'
import d5 from './d5.jpg'
import d52 from './d5.2.jpg'
import d6 from './d6.jpg'
import d62 from './d6.2.jpg'

import e1 from './e1.jpg'
import e12 from './e1.2.jpg'
import e2 from './e2.jpg'
import e22 from './e2.1.jpg'
import e23 from './e2.3.jpg'

import f1 from './f1.jpg'
import f2 from './f2.jpg'
import f22 from './f2.2.jpg'
import f3 from './f3.jpg'
import f32 from './f3.2.jpg'
import f4 from './f4.jpg'
import f42 from './f4.2.jpg'
import f5 from './f5.jpg'
import f52 from './f5.2.jpg'

import g1 from './g1.jpg'
import g12 from './g1.2.jpg'
import g2 from './g2.jpg'
import g22 from './g2.3.jpg'
import g3 from './g3.jpg'
import g32 from './g3.2.jpg'
import g4 from './g4.jpg'
import g42 from './g4.2.jpg'

import upload_area from "./upload_area.png";


import accessories from './Accessories.jpg'
import intelligent_glasses from './Intelligent_glasses.jpg'
import Kid_Glasses from './Kid_glassess.jpg'
import lenses from './lenses.jpg'
import men_glassess from './men_glasses.jpg'
import women_glassess from './women_glassess.jpg'
import Sunglasses from './Sunglasses.jpg'


import logo from './logo.png'
import hero_img from './hero_img.jpg'
import hero_img2 from './hero_img2.jpg'
import hero_img3 from './hero_img3.jpg'
import try_on from './try_on.jpg'
import tryon_icon from './try-on.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import whatsapp from './whatsapp.png'
import size_chart from './sizechart.jpg'

export const assets = {
    upload_area,
    logo,
    hero_img,
    hero_img2,
    hero_img3,
    try_on,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    accessories,
    Sunglasses,
    women_glassess,
    men_glassess,
    lenses,
    Kid_Glasses,
    intelligent_glasses,
    whatsapp,
    tryon_icon,
    size_chart
}

export const products=[
    // Full Rim
    {
        _id: "m-fullrim-1",
        name: "Classic Black Full Rim Glasses",
        description: "Timeless black full-rim glasses with a sturdy frame, designed for everyday wear. Perfect for both professional and casual looks.",
        price: 150,
        salePrice: 120,
        image: [a1,a12],
        category: "MEN GLASSES",
        subCategory: "Full Rim",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-fullrim-2",
        name: "Matte Blue Full Rim Glasses",
        description: "Modern matte blue full-rim glasses offering durability and style. Ideal for long-term wear with lightweight comfort.",
        price: 140,
        salePrice: 110,
        image: [a12],
        category: "MEN GLASSES",
        subCategory: "Full Rim",
        sizes: ["S", "M", "L"],
        date: 1716634345449,
        bestseller: false,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-fullrim-3",
        name: "Bold Tortoiseshell Full Rim Glasses",
        description: "A stylish tortoiseshell frame with a full-rim design, combining vintage aesthetics with modern comfort.",
        price: 160,
        salePrice: 130,
        image: [a12,a13],
        category: "MEN GLASSES",
        subCategory: "Full Rim",
        sizes: ["M", "L"],
        date: 1716634345450,
        bestseller: true,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Half Rim
    {
        _id: "m-halfrim-1",
        name: "Minimalist Black Half Rim Glasses",
        description: "Sleek black half-rim glasses designed for a sophisticated and lightweight feel, suitable for formal and everyday use.",
        price: 135,
        salePrice: 110,
        image: [a2,a23],
        category: "MEN GLASSES",
        subCategory: "Half Rim",
        sizes: ["M", "L"],
        date: 1716634345451,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-halfrim-2",
        name: "Gunmetal Silver Half Rim Glasses",
        description: "A premium metal half-rim frame with a stylish gunmetal silver finish, built for durability and elegance.",
        price: 145,
        salePrice: 115,
        image: [a22],
        category: "MEN GLASSES",
        subCategory: "Half Rim",
        sizes: ["S", "M", "L"],
        date: 1716634345452,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-halfrim-3",
        name: "Brown Wooden Finish Half Rim Glasses",
        description: "Wood-inspired brown half-rim glasses for a natural, eco-friendly aesthetic without compromising durability.",
        price: 155,
        salePrice: 125,
        image: [a23,a2],
        category: "MEN GLASSES",
        subCategory: "Half Rim",
        sizes: ["M", "L"],
        date: 1716634345453,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Rimless
    {
        _id: "m-rimless-1",
        name: "Ultra-Lightweight Rimless Glasses",
        description: "Minimalist rimless glasses with a nearly invisible frame, designed for all-day comfort and a barely-there feel.",
        price: 180,
        salePrice: 145,
        image: [a3],
        category: "MEN GLASSES",
        subCategory: "Rimless",
        sizes: ["M", "L"],
        date: 1716634345454,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-rimless-2",
        name: "Transparent Rimless Glasses",
        description: "Crystal-clear rimless glasses with anti-glare lenses, perfect for a modern, sophisticated look.",
        price: 170,
        salePrice: 140,
        image: [a32],
        category: "MEN GLASSES",
        subCategory: "Rimless",
        sizes: ["S", "M"],
        date: 1716634345455,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-rimless-3",
        name: "Gold Trim Rimless Glasses",
        description: "Premium rimless glasses with gold accents, designed for an executive, high-class appeal.",
        price: 190,
        salePrice: 155,
        image: [a32,a33],
        category: "MEN GLASSES",
        subCategory: "Rimless",
        sizes: ["M", "L"],
        date: 1716634345456,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Blue Light Blocking
    {
        _id: "m-blue-1",
        name: "Matte Black Blue Light Glasses",
        description: "Protect your eyes with these matte black glasses featuring advanced blue light blocking technology for reduced eye strain.",
        price: 130,
        salePrice: 105,
        image: [a4],
        category: "MEN GLASSES",
        subCategory: "Blue Light Blocking",
        sizes: ["S", "M", "L"],
        date: 1716634345457,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-blue-2",
        name: "Clear Frame Blue Light Glasses",
        description: "Lightweight, transparent frame with blue light protection, perfect for work-from-home and long screen sessions.",
        price: 125,
        salePrice: 100,
        image: [a42],
        category: "MEN GLASSES",
        subCategory: "Blue Light Blocking",
        sizes: ["M", "L"],
        date: 1716634345458,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-blue-3",
        name: "Metallic Grey Blue Light Glasses",
        description: "Sleek metallic grey blue light glasses designed for professionals looking for eye protection without compromising on style.",
        price: 140,
        salePrice: 115,
        image: [a42],
        category: "MEN GLASSES",
        subCategory: "Blue Light Blocking",
        sizes: ["S", "M", "L"],
        date: 1716634345459,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Progressive Lenses
    {
        _id: "m-progressive-1",
        name: "Classic Black Progressive Glasses",
        description: "High-quality progressive lenses with a classic black frame, ideal for smooth vision transition.",
        price: 200,
        salePrice: 170,
        image: [a5],
        category: "MEN GLASSES",
        subCategory: "Progressive Lenses",
        sizes: ["M", "L"],
        date: 1716634345460,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-progressive-2",
        name: "Titanium Progressive Glasses",
        description: "Ultra-light titanium frame with progressive lenses for a sophisticated, professional look.",
        price: 220,
        salePrice: 185,
        image: [a52],
        category: "MEN GLASSES",
        subCategory: "Progressive Lenses",
        sizes: ["S", "M"],
        date: 1716634345461,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-progressive-3",
        name: "Retro Brown Progressive Glasses",
        description: "A retro brown frame with high-quality progressive lenses, blending vintage style with modern lens technology.",
        price: 210,
        salePrice: 175,
        image: [a5],
        category: "MEN GLASSES",
        subCategory: "Progressive Lenses",
        sizes: ["M", "L"],
        date: 1716634345462,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

        // Reading Glasses
        {
            _id: "m-reading-1",
            name: "Lightweight Black Reading Glasses",
            description: "Ultra-lightweight black reading glasses designed for comfortable all-day wear with crystal-clear lenses for easy reading.",
            price: 110,
            salePrice: 90,
            image: [a6],
            category: "MEN GLASSES",
            subCategory: "Reading Glasses",
            sizes: ["S", "M", "L"],
            date: 1716634345463,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "m-reading-2",
            name: "Flexible Blue Reading Glasses",
            description: "Stylish blue reading glasses with a flexible, durable frame and anti-fatigue lenses for clear and sharp vision.",
            price: 120,
            salePrice: 95,
            image: [a62],
            category: "MEN GLASSES",
            subCategory: "Reading Glasses",
            sizes: ["M", "L"],
            date: 1716634345464,
            bestseller: false,
            OnSale: false,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "m-reading-3",
            name: "Brown Tortoiseshell Reading Glasses",
            description: "A timeless tortoiseshell frame with premium reading lenses, combining style and function for everyday use.",
            price: 130,
            salePrice: 100,
            image: [a6],
            category: "MEN GLASSES",
            subCategory: "Reading Glasses",
            sizes: ["S", "M", "L"],
            date: 1716634345465,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
 
        //Women
         // Full Rim
    {
        _id: "m-fullrim-1",
        name: "Classic Black Full Rim Glasses",
        description: "Timeless black full-rim glasses with a sturdy frame, designed for everyday wear. Perfect for both professional and casual looks.",
        price: 150,
        salePrice: 120,
        image: [a1,a12],
        category: "WOMEN GLASSES",
        subCategory: "Full Rim",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-fullrim-2",
        name: "Matte Blue Full Rim Glasses",
        description: "Modern matte blue full-rim glasses offering durability and style. Ideal for long-term wear with lightweight comfort.",
        price: 140,
        salePrice: 110,
        image: [a12],
        category: "WOMEN GLASSES",
        subCategory: "Full Rim",
        sizes: ["S", "M", "L"],
        date: 1716634345449,
        bestseller: false,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-fullrim-3",
        name: "Bold Tortoiseshell Full Rim Glasses",
        description: "A stylish tortoiseshell frame with a full-rim design, combining vintage aesthetics with modern comfort.",
        price: 160,
        salePrice: 130,
        image: [a12,a13],
        category: "WOMEN GLASSES",
        subCategory: "Full Rim",
        sizes: ["M", "L"],
        date: 1716634345450,
        bestseller: true,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Half Rim
    {
        _id: "m-halfrim-1",
        name: "Minimalist Black Half Rim Glasses",
        description: "Sleek black half-rim glasses designed for a sophisticated and lightweight feel, suitable for formal and everyday use.",
        price: 135,
        salePrice: 110,
        image: [a2,a23],
        category: "WOMEN GLASSES",
        subCategory: "Half Rim",
        sizes: ["M", "L"],
        date: 1716634345451,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-halfrim-2",
        name: "Gunmetal Silver Half Rim Glasses",
        description: "A premium metal half-rim frame with a stylish gunmetal silver finish, built for durability and elegance.",
        price: 145,
        salePrice: 115,
        image: [a22],
        category: "WOMEN GLASSES",
        subCategory: "Half Rim",
        sizes: ["S", "M", "L"],
        date: 1716634345452,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-halfrim-3",
        name: "Brown Wooden Finish Half Rim Glasses",
        description: "Wood-inspired brown half-rim glasses for a natural, eco-friendly aesthetic without compromising durability.",
        price: 155,
        salePrice: 125,
        image: [a23,a2],
        category: "WOMEN GLASSES",
        subCategory: "Half Rim",
        sizes: ["M", "L"],
        date: 1716634345453,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Rimless
    {
        _id: "m-rimless-1",
        name: "Ultra-Lightweight Rimless Glasses",
        description: "Minimalist rimless glasses with a nearly invisible frame, designed for all-day comfort and a barely-there feel.",
        price: 180,
        salePrice: 145,
        image: [a3],
        category: "WOMEN GLASSES",
        subCategory: "Rimless",
        sizes: ["M", "L"],
        date: 1716634345454,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-rimless-2",
        name: "Transparent Rimless Glasses",
        description: "Crystal-clear rimless glasses with anti-glare lenses, perfect for a modern, sophisticated look.",
        price: 170,
        salePrice: 140,
        image: [a32],
        category: "WOMEN GLASSES",
        subCategory: "Rimless",
        sizes: ["S", "M"],
        date: 1716634345455,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-rimless-3",
        name: "Gold Trim Rimless Glasses",
        description: "Premium rimless glasses with gold accents, designed for an executive, high-class appeal.",
        price: 190,
        salePrice: 155,
        image: [a32,a33],
        category: "WOMEN GLASSES",
        subCategory: "Rimless",
        sizes: ["M", "L"],
        date: 1716634345456,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Blue Light Blocking
    {
        _id: "m-blue-1",
        name: "Matte Black Blue Light Glasses",
        description: "Protect your eyes with these matte black glasses featuring advanced blue light blocking technology for reduced eye strain.",
        price: 130,
        salePrice: 105,
        image: [a4],
        category: "WOMEN GLASSES",
        subCategory: "Blue Light Blocking",
        sizes: ["S", "M", "L"],
        date: 1716634345457,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-blue-2",
        name: "Clear Frame Blue Light Glasses",
        description: "Lightweight, transparent frame with blue light protection, perfect for work-from-home and long screen sessions.",
        price: 125,
        salePrice: 100,
        image: [a42],
        category: "WOMEN GLASSES",
        subCategory: "Blue Light Blocking",
        sizes: ["M", "L"],
        date: 1716634345458,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-blue-3",
        name: "Metallic Grey Blue Light Glasses",
        description: "Sleek metallic grey blue light glasses designed for professionals looking for eye protection without compromising on style.",
        price: 140,
        salePrice: 115,
        image: [a42],
        category: "WOMEN GLASSES",
        subCategory: "Blue Light Blocking",
        sizes: ["S", "M", "L"],
        date: 1716634345459,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Progressive Lenses
    {
        _id: "m-progressive-1",
        name: "Classic Black Progressive Glasses",
        description: "High-quality progressive lenses with a classic black frame, ideal for smooth vision transition.",
        price: 200,
        salePrice: 170,
        image: [a5],
        category: "WOMEN GLASSES",
        subCategory: "Progressive Lenses",
        sizes: ["M", "L"],
        date: 1716634345460,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-progressive-2",
        name: "Titanium Progressive Glasses",
        description: "Ultra-light titanium frame with progressive lenses for a sophisticated, professional look.",
        price: 220,
        salePrice: 185,
        image: [a52],
        category: "WOMEN GLASSES",
        subCategory: "Progressive Lenses",
        sizes: ["S", "M"],
        date: 1716634345461,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "m-progressive-3",
        name: "Retro Brown Progressive Glasses",
        description: "A retro brown frame with high-quality progressive lenses, blending vintage style with modern lens technology.",
        price: 210,
        salePrice: 175,
        image: [a5],
        category: "WOMEN GLASSES",
        subCategory: "Progressive Lenses",
        sizes: ["M", "L"],
        date: 1716634345462,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

        // Reading Glasses
        {
            _id: "m-reading-1",
            name: "Lightweight Black Reading Glasses",
            description: "Ultra-lightweight black reading glasses designed for comfortable all-day wear with crystal-clear lenses for easy reading.",
            price: 110,
            salePrice: 90,
            image: [a6],
            category: "WOMEN GLASSES",
            subCategory: "Reading Glasses",
            sizes: ["S", "M", "L"],
            date: 1716634345463,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "m-reading-2",
            name: "Flexible Blue Reading Glasses",
            description: "Stylish blue reading glasses with a flexible, durable frame and anti-fatigue lenses for clear and sharp vision.",
            price: 120,
            salePrice: 95,
            image: [a62],
            category: "WOMEN GLASSES",
            subCategory: "Reading Glasses",
            sizes: ["M", "L"],
            date: 1716634345464,
            bestseller: false,
            OnSale: false,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "m-reading-3",
            name: "Brown Tortoiseshell Reading Glasses",
            description: "A timeless tortoiseshell frame with premium reading lenses, combining style and function for everyday use.",
            price: 130,
            salePrice: 100,
            image: [a6],
            category: "WOMEN GLASSES",
            subCategory: "Reading Glasses",
            sizes: ["S", "M", "L"],
            date: 1716634345465,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },


        {
            _id: "k-prescription-1",
            name: "Durable Black Kids Prescription Glasses",
            description: "Lightweight, impact-resistant prescription glasses for kids, designed for durability and comfort.",
            price: 90,
            salePrice: 75,
            image: [c1],
            category: "KIDS GLASSES",
            subCategory: "Prescription",
            sizes: ["S", "M"],
            date: 1716634345466,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "k-prescription-2",
            name: "Flexible Blue Kids Prescription Glasses",
            description: "Flexible, bendable frame with prescription lenses, ensuring safety and comfort for active kids.",
            price: 95,
            salePrice: 80,
            image: [c12],
            category: "KIDS GLASSES",
            subCategory: "Prescription",
            sizes: ["S", "M", "L"],
            date: 1716634345467,
            bestseller: false,
            OnSale: false,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "k-prescription-3",
            name: "Pink Round Kids Prescription Glasses",
            description: "Adorable round pink frames with lightweight prescription lenses, perfect for young children.",
            price: 100,
            salePrice: 85,
            image: [c1],
            category: "KIDS GLASSES",
            subCategory: "Prescription",
            sizes: ["S", "M"],
            date: 1716634345468,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
    
        // Kids Sunglasses
        {
            _id: "k-sunglasses-1",
            name: "UV Protection Black Kids Sunglasses",
            description: "Stylish black sunglasses with UV400 protection, ensuring safety from harmful sun rays.",
            price: 80,
            salePrice: 65,
            image: [c2],
            category: "KIDS GLASSES",
            subCategory: "Sunglasses",
            sizes: ["M", "L"],
            date: 1716634345469,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "k-sunglasses-2",
            name: "Blue Reflective Kids Sunglasses",
            description: "Trendy blue mirrored sunglasses designed for maximum sun protection and style.",
            price: 85,
            salePrice: 70,
            image: [c22],
            category: "KIDS GLASSES",
            subCategory: "Sunglasses",
            sizes: ["S", "M"],
            date: 1716634345470,
            bestseller: false,
            OnSale: false,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "k-sunglasses-3",
            name: "Pink Heart-Shaped Kids Sunglasses",
            description: "Cute pink heart-shaped sunglasses with UV protection, perfect for outdoor fun.",
            price: 90,
            salePrice: 75,
            image: [c2],
            category: "KIDS GLASSES",
            subCategory: "Sunglasses",
            sizes: ["S", "M"],
            date: 1716634345471,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
    
        // Kids Blue Light Glasses
        {
            _id: "k-blue-1",
            name: "Anti-Glare Blue Light Kids Glasses",
            description: "Blue light filtering glasses designed to reduce digital eye strain for kids who spend time on screens.",
            price: 95,
            salePrice: 80,
            image: [c3],
            category: "KIDS GLASSES",
            subCategory: "Blue LightGlasses",
            sizes: ["S", "M", "L"],
            date: 1716634345472,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "k-blue-2",
            name: "Transparent Frame Blue Light Glasses",
            description: "Lightweight, transparent frame with blue light blocking technology to protect young eyes.",
            price: 100,
            salePrice: 85,
            image: [c32],
            category: "KIDS GLASSES",
            subCategory: "Blue LightGlasses",
            sizes: ["S", "M"],
            date: 1716634345473,
            bestseller: false,
            OnSale: false,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },
        {
            _id: "k-blue-3",
            name: "Flexible Blue Light Kids Glasses",
            description: "Durable, flexible frame with blue light protection, perfect for school and screen time.",
            price: 105,
            salePrice: 90,
            image: [c3],
            category: "KIDS GLASSES",
            subCategory: "Blue LightGlasses",
            sizes: ["S", "M", "L"],
            date: 1716634345474,
            bestseller: true,
            OnSale: true,
            reviews: [
                {
                    name: "John Doe",
                    rating: 5,
                    comment: "Amazing glasses! Very comfortable.",
                    images: [a1, a2]
                },
                {
                    name: "Jane Smith",
                    rating: 4,
                    comment: "Great quality but slightly heavy.",
                    images: [a3]
                }
            ]
        },

        // Polarized Sunglasses
    {
        _id: "s-polarized-1",
        name: "Classic Black Polarized Sunglasses",
        description: "Timeless black polarized sunglasses with UV protection for enhanced clarity and reduced glare.",
        price: 120,
        salePrice: 100,
        image: [d1],
        category: "SUNGLASSES",
        subCategory: "Polarized",
        sizes: ["M", "L"],
        date: 1716634345475,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-polarized-2",
        name: "Blue Mirrored Polarized Sunglasses",
        description: "Trendy blue mirrored sunglasses with high-quality polarized lenses for ultimate sun protection.",
        price: 130,
        salePrice: 110,
        image: [d12,d1],
        category: "SUNGLASSES",
        subCategory: "Polarized",
        sizes: ["S", "M"],
        date: 1716634345476,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-polarized-3",
        name: "Brown Tinted Polarized Sunglasses",
        description: "Elegant brown-tinted polarized sunglasses, perfect for driving and outdoor adventures.",
        price: 125,
        salePrice: 105,
        image: [d13],
        category: "SUNGLASSES",
        subCategory: "Polarized",
        sizes: ["M", "L"],
        date: 1716634345477,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Non-Polarized Sunglasses
    {
        _id: "s-nonpolarized-1",
        name: "Casual Non-Polarized Black Sunglasses",
        description: "Simple yet stylish black non-polarized sunglasses for everyday wear and sun protection.",
        price: 100,
        salePrice: 85,
        image: [d2],
        category: "SUNGLASSES",
        subCategory: "Non-Polarized",
        sizes: ["S", "M"],
        date: 1716634345478,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-nonpolarized-2",
        name: "Tortoiseshell Non-Polarized Sunglasses",
        description: "Trendy tortoiseshell sunglasses with non-polarized lenses for a stylish, modern look.",
        price: 110,
        salePrice: 95,
        image: [d2],
        category: "SUNGLASSES",
        subCategory: "Non-Polarized",
        sizes: ["M", "L"],
        date: 1716634345479,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-nonpolarized-3",
        name: "Transparent Frame Non-Polarized Sunglasses",
        description: "Minimalist transparent frame sunglasses for a sleek and lightweight feel.",
        price: 115,
        salePrice: 100,
        image: [d2],
        category: "SUNGLASSES",
        subCategory: "Non-Polarized",
        sizes: ["S", "M", "L"],
        date: 1716634345480,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Aviators
    {
        _id: "s-aviator-1",
        name: "Gold Frame Aviator Sunglasses",
        description: "Classic gold aviator sunglasses with UV protection and a sleek metal frame.",
        price: 140,
        salePrice: 120,
        image: [d3],
        category: "SUNGLASSES",
        subCategory: "Aviators",
        sizes: ["M", "L"],
        date: 1716634345481,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-aviator-2",
        name: "Silver Mirror Aviator Sunglasses",
        description: "Trendy silver mirrored aviator sunglasses for a bold and stylish look.",
        price: 145,
        salePrice: 125,
        image: [d32],
        category: "SUNGLASSES",
        subCategory: "Aviators",
        sizes: ["M", "L"],
        date: 1716634345482,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-aviator-3",
        name: "Black Aviator Sunglasses",
        description: "Iconic black aviator sunglasses with anti-glare lenses for superior visibility.",
        price: 135,
        salePrice: 115,
        image: [d33],
        category: "SUNGLASSES",
        subCategory: "Aviators",
        sizes: ["S", "M", "L"],
        date: 1716634345483,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Wayfarer
    {
        _id: "s-wayfarer-1",
        name: "Classic Black Wayfarer Sunglasses",
        description: "Timeless black wayfarer sunglasses with a sturdy frame and UV protection.",
        price: 110,
        salePrice: 95,
        image: [d4],
        category: "SUNGLASSES",
        subCategory: "Wayfarer",
        sizes: ["M", "L"],
        date: 1716634345484,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-wayfarer-2",
        name: "Brown Gradient Wayfarer Sunglasses",
        description: "Stylish brown gradient wayfarer sunglasses for a retro yet modern look.",
        price: 115,
        salePrice: 100,
        image: [d42],
        category: "SUNGLASSES",
        subCategory: "Wayfarer",
        sizes: ["S", "M"],
        date: 1716634345485,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-wayfarer-3",
        name: "Blue Frame Wayfarer Sunglasses",
        description: "Trendy blue frame wayfarer sunglasses with a fresh, youthful design.",
        price: 120,
        salePrice: 105,
        image: [d4],
        category: "SUNGLASSES",
        subCategory: "Wayfarer",
        sizes: ["S", "M", "L"],
        date: 1716634345486,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Rounded Sunglasses
    {
        _id: "s-rounded-1",
        name: "Retro Round Metal Frame Sunglasses",
        description: "Vintage round sunglasses with a metal frame for a classic aesthetic.",
        price: 130,
        salePrice: 110,
        image: [d5],
        category: "SUNGLASSES",
        subCategory: "Rounded",
        sizes: ["M", "L"],
        date: 1716634345487,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-rounded-2",
        name: "Black and Gold Round Sunglasses",
        description: "Elegant black and gold round sunglasses with anti-glare coated lenses.",
        price: 135,
        salePrice: 115,
        image: [d52],
        category: "SUNGLASSES",
        subCategory: "Rounded",
        sizes: ["S", "M"],
        date: 1716634345488,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-rounded-3",
        name: "Tortoiseshell Round Sunglasses",
        description: "Classic tortoiseshell round sunglasses with stylish tinted lenses.",
        price: 140,
        salePrice: 120,
        image: [d5],
        category: "SUNGLASSES",
        subCategory: "Rounded",
        sizes: ["S", "M", "L"],
        date: 1716634345489,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Sports Sunglasses
    {
        _id: "s-sports-1",
        name: "Wraparound Sports Sunglasses",
        description: "Durable wraparound sports sunglasses for cycling, running, and outdoor activities.",
        price: 150,
        salePrice: 130,
        image: [d6],
        category: "SUNGLASSES",
        subCategory: "Sports Sunglasses",
        sizes: ["M", "L"],
        date: 1716634345490,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-sports-2",
        name: "Polarized Athletic Sunglasses",
        description: "High-performance polarized sports sunglasses with anti-slip nose pads.",
        price: 155,
        salePrice: 135,
        image: [d62],
        category: "SUNGLASSES",
        subCategory: "Sports Sunglasses",
        sizes: ["S", "M"],
        date: 1716634345491,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "s-sports-3",
        name: "UV Protection Sports Sunglasses",
        description: "Advanced UV protection sports sunglasses with impact-resistant lenses.",
        price: 160,
        salePrice: 140,
        image: [d6],
        category: "SUNGLASSES",
        subCategory: "Sports Sunglasses",
        sizes: ["S", "M", "L"],
        date: 1716634345492,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Smart Lenses
    {
        _id: "i-smart-1",
        name: "AI-Enhanced Smart Glasses",
        description: "Next-gen smart glasses with AI-powered real-time translation and voice commands.",
        price: 300,
        salePrice: 270,
        image: [e1],
        category: "INTELLIGENT GLASSES",
        subCategory: "Smart Lenses",
        sizes: ["M", "L"],
        date: 1716634345500,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "i-smart-2",
        name: "Augmented Reality Smart Glasses",
        description: "High-tech AR smart glasses with a transparent display and intuitive touch controls.",
        price: 350,
        salePrice: 320,
        image: [e12],
        category: "INTELLIGENT GLASSES",
        subCategory: "Smart Lenses",
        sizes: ["S", "M"],
        date: 1716634345501,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "i-smart-3",
        name: "Fitness Tracker Smart Glasses",
        description: "Lightweight smart glasses with built-in fitness tracking and heart rate monitoring.",
        price: 280,
        salePrice: 250,
        image: [e1],
        category: "INTELLIGENT GLASSES",
        subCategory: "Smart Lenses",
        sizes: ["M", "L"],
        date: 1716634345502,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Blue Light Filter Glasses
    {
        _id: "i-blue-1",
        name: "Ultra-Clear Blue Light Glasses",
        description: "Stylish glasses with a blue light filter, perfect for reducing eye strain during screen time.",
        price: 100,
        salePrice: 85,
        image: [e2],
        category: "INTELLIGENT GLASSES",
        subCategory: "Blue Light Filter",
        sizes: ["S", "M", "L"],
        date: 1716634345503,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "i-blue-2",
        name: "Anti-Glare Blue Light Glasses",
        description: "Advanced anti-glare blue light glasses designed for prolonged use with digital screens.",
        price: 120,
        salePrice: 100,
        image: [e22],
        category: "INTELLIGENT GLASSES",
        subCategory: "Blue Light Filter",
        sizes: ["M", "L"],
        date: 1716634345504,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "i-blue-3",
        name: "Retro Round Blue Light Glasses",
        description: "Classic round-frame glasses with blue light blocking technology for all-day comfort.",
        price: 110,
        salePrice: 95,
        image: [e23],
        category: "INTELLIGENT GLASSES",
        subCategory: "Blue Light Filter",
        sizes: ["S", "M"],
        date: 1716634345505,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

     // Multifocal Lenses
     {
        _id: "l-multi-1",
        name: "UltraClear Multifocal Lenses",
        description: "Advanced multifocal lenses providing sharp vision at all distances.",
        price: 60,
        salePrice: 50,
        image: [f1],
        category: "LENSES",
        subCategory: "Multifocal",
        sizes: ["Standard"],
        date: 1716634345600,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "l-multi-2",
        name: "Precision Vision Multifocal Lenses",
        description: "Comfortable, high-definition multifocal lenses for seamless transition between near and far vision.",
        price: 70,
        salePrice: 60,
        image: [f1],
        category: "LENSES",
        subCategory: "Multifocal",
        sizes: ["Standard"],
        date: 1716634345601,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Daily Disposable Lenses
    {
        _id: "l-daily-1",
        name: "FreshLook Daily Disposable Lenses",
        description: "Convenient daily lenses offering crisp, clear vision with superior comfort.",
        price: 30,
        salePrice: 25,
        image: [f2],
        category: "LENSES",
        subCategory: "Daily Disposable",
        sizes: ["Standard"],
        date: 1716634345602,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "l-daily-2",
        name: "HydroComfort Daily Lenses",
        description: "Moisture-rich daily lenses designed for all-day hydration and comfort.",
        price: 35,
        salePrice: 30,
        image: [f22],
        category: "LENSES",
        subCategory: "Daily Disposable",
        sizes: ["Standard"],
        date: 1716634345603,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Monthly Disposable Lenses
    {
        _id: "l-monthly-1",
        name: "OptiView Monthly Contact Lenses",
        description: "Durable and comfortable monthly lenses for extended wear.",
        price: 40,
        salePrice: 35,
        image: [f3],
        category: "LENSES",
        subCategory: "Monthly Disposable",
        sizes: ["Standard"],
        date: 1716634345604,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "l-monthly-2",
        name: "ClearVision Monthly Lenses",
        description: "High-quality monthly lenses offering sharp, long-lasting vision.",
        price: 45,
        salePrice: 38,
        image: [f32],
        category: "LENSES",
        subCategory: "Monthly Disposable",
        sizes: ["Standard"],
        date: 1716634345605,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Colored Lenses
    {
        _id: "l-colored-1",
        name: "AquaShine Colored Contact Lenses",
        description: "Vibrant colored lenses for a fresh, stunning look with UV protection.",
        price: 50,
        salePrice: 42,
        image: [f4],
        category: "LENSES",
        subCategory: "Colored Lenses",
        sizes: ["Standard"],
        date: 1716634345606,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "l-colored-2",
        name: "Elegance Hazel Colored Lenses",
        description: "Natural-looking colored lenses available in multiple shades.",
        price: 55,
        salePrice: 48,
        image: [f42],
        category: "LENSES",
        subCategory: "Colored Lenses",
        sizes: ["Standard"],
        date: 1716634345607,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Toric (Astigmatism) Lenses
    {
        _id: "l-toric-1",
        name: "StableVision Toric Lenses",
        description: "Precision-engineered toric lenses for astigmatism correction.",
        price: 65,
        salePrice: 58,
        image: [f5],
        category: "LENSES",
        subCategory: "Toric (Astigmatism)",
        sizes: ["Standard"],
        date: 1716634345608,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "l-toric-2",
        name: "Astigmo Comfort Toric Lenses",
        description: "Soft, high-performance toric lenses for stable and clear vision.",
        price: 70,
        salePrice: 62,
        image: [f52],
        category: "LENSES",
        subCategory: "Toric (Astigmatism)",
        sizes: ["Standard"],
        date: 1716634345609,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Cases
    {
        _id: "a-case-1",
        name: "Premium Hard Shell Glasses Case",
        description: "Durable and stylish hard shell case to protect your glasses from scratches and damage.",
        price: 20,
        salePrice: 15,
        image: [g1],
        category: "ACCESSORIES",
        subCategory: "Cases",
        sizes: ["Standard"],
        date: 1716634345700,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "a-case-2",
        name: "Leather Protective Glasses Case",
        description: "Elegant leather case with a soft inner lining for extra protection.",
        price: 25,
        salePrice: 20,
        image: [g12],
        category: "ACCESSORIES",
        subCategory: "Cases",
        sizes: ["Standard"],
        date: 1716634345701,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Cleaning Kits
    {
        _id: "a-cleaning-1",
        name: "Complete Glasses Cleaning Kit",
        description: "Includes microfiber cloth, lens cleaner spray, and screwdriver for adjustments.",
        price: 18,
        salePrice: 15,
        image: [g2],
        category: "ACCESSORIES",
        subCategory: "Cleaning Kits",
        sizes: ["Standard"],
        date: 1716634345702,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "a-cleaning-2",
        name: "Deluxe Lens Cleaning Set",
        description: "Anti-smudge and anti-static cleaning solution for crystal-clear vision.",
        price: 22,
        salePrice: 18,
        image: [g22],
        category: "ACCESSORIES",
        subCategory: "Cleaning Kits",
        sizes: ["Standard"],
        date: 1716634345703,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Lens Wipes
    {
        _id: "a-wipes-1",
        name: "Pre-Moistened Lens Wipes (Pack of 50)",
        description: "Individually wrapped lens wipes for on-the-go convenience and streak-free cleaning.",
        price: 12,
        salePrice: 10,
        image: [g3],
        category: "ACCESSORIES",
        subCategory: "Lens Wipes",
        sizes: ["Standard"],
        date: 1716634345704,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "a-wipes-2",
        name: "Anti-Bacterial Lens Wipes (Pack of 100)",
        description: "Fast-drying, anti-bacterial wipes safe for all lens types, including AR-coated lenses.",
        price: 20,
        salePrice: 15,
        image: [g32],
        category: "ACCESSORIES",
        subCategory: "Lens Wipes",
        sizes: ["Standard"],
        date: 1716634345705,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },

    // Anti-Fog Solutions
    {
        _id: "a-fog-1",
        name: "Anti-Fog Lens Spray",
        description: "Prevents fogging on glasses, perfect for masks and humid conditions.",
        price: 15,
        salePrice: 12,
        image: [g4],
        category: "ACCESSORIES",
        subCategory: "Anti-Fog Solutions",
        sizes: ["Standard"],
        date: 1716634345706,
        bestseller: true,
        OnSale: true,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    },
    {
        _id: "a-fog-2",
        name: "Anti-Fog Microfiber Cloth",
        description: "Reusable microfiber cloth infused with anti-fog treatment for long-lasting clarity.",
        price: 18,
        salePrice: 14,
        image: [g42],
        category: "ACCESSORIES",
        subCategory: "Anti-Fog Solutions",
        sizes: ["Standard"],
        date: 1716634345707,
        bestseller: false,
        OnSale: false,
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                comment: "Amazing glasses! Very comfortable.",
                images: [a1, a2]
            },
            {
                name: "Jane Smith",
                rating: 4,
                comment: "Great quality but slightly heavy.",
                images: [a3]
            }
        ]
    }

]
