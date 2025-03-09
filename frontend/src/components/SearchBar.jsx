import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import PropTypes from 'prop-types';


const SearchBar = ({ alwaysVisible = false }) => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    
// If alwaysVisible is true, ignore showSearch and display it permanently
if (!alwaysVisible && !showSearch) return null;

  return (
    <div className='text-center border-t'>
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
    </div>
  ) 
}

SearchBar.propTypes = {
    alwaysVisible: PropTypes.bool
};

export default SearchBar
