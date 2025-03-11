import { useContext ,useEffect,useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";


const SearchBar = ({ alwaysVisible = false }) => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(alwaysVisible);
    const [suggestions, setSuggestions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Category & Subcategory Data
  const categories = [
    { name: "Men Glasses", subcategories: ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"] },
    { name: "Women Glasses", subcategories: ["Full Rim", "Half Rim", "Rimless", "Blue Light Blocking", "Progressive Lenses", "Reading Glasses"] },
    { name: "Kids Glasses", subcategories: ["Prescription", "Sunglasses", "Blue Light Glasses"] },
    { name: "Sunglasses", subcategories: ["Polarized", "Non-Polarized", "Aviators", "Wayfarer", "Rounded", "Sports Sunglasses"] },
    { name: "Intelligent Glasses", subcategories: ["Smart Lenses", "Blue Light Filter"] },
    { name: "Lenses", subcategories: ["Multifocal", "Daily Disposable", "Monthly Disposable", "Colored Lenses", "Toric (Astigmatism)"] },
    { name: "Accessories", subcategories: ["Cases", "Cleaning Kits", "Lens Wipes", "Anti-Fog Solutions"] }
  ];

  useEffect(() => {
    // Show search only on specific pages
    if (location.pathname.includes("collection") || alwaysVisible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, alwaysVisible]);

  // Handle search input and update suggestions
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    let results = [];

    categories.forEach((category) => {
      // Match category names
      if (category.name.toLowerCase().includes(search.toLowerCase())) {
        results.push({ name: category.name, url: `/category/${category.name.toLowerCase()}` });
      }

      // Match subcategories
      category.subcategories.forEach((sub) => {
        if (sub.toLowerCase().includes(search.toLowerCase())) {
          results.push({ name: `${category.name} - ${sub}`, url: `/category/${category.name.toLowerCase()}/${sub.toLowerCase()}` });
        }
      });
    });

    setSuggestions(results);
  }, [search]);

  // Navigate when a suggestion is clicked
  const handleSuggestionClick = (url) => {
    setShowSearch(false);
    setSearch("");
    setSuggestions([]);
    navigate(url);
  };


// If alwaysVisible is true, ignore showSearch and display it permanently
if (!alwaysVisible && !showSearch) return null;

  return (
    <div className='relative text-center border-t'>
        <div className='inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 my-5 border border-gray-400 rounded-full sm:w-1/2'>
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className='flex-1 text-sm outline-none bg-inherit' 
                type="text" placeholder='Search...' 
            />
            <img className='w-4' src={assets.search_icon} alt="Search" />
        </div>

        {!alwaysVisible && (
                <img 
                    onClick={() => setShowSearch(false)} 
                    className='inline w-3 cursor-pointer' 
                    src={assets.cross_icon} alt="Close" 
                />
            )}

            {/* Search Suggestions (Only on Home Page) */}
            {location.pathname === "/" && suggestions.length > 0 && (
  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[50%] bg-white shadow-lg rounded-md border mt-1 max-h-52 overflow-y-auto z-50">

    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className="p-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-left"
        onClick={() => handleSuggestionClick(suggestion.url)}
      >
        {suggestion.name}
      </div>
    ))}
  </div>
)}

    </div>
  ) 
}

SearchBar.propTypes = {
    alwaysVisible: PropTypes.bool
};

export default SearchBar
