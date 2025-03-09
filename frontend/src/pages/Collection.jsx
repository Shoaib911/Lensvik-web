import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [frameType, setFrameType] = useState([]);
  const [frameShape, setFrameShape] = useState([]);
  const [size, setSize] = useState([]);
  const [gender, setGender] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortType, setSortType] = useState("relevant");

  const toggleFilter = (filterState, setFilterState, value) => {
    if (filterState.includes(value)) {
      setFilterState(filterState.filter((item) => item !== value));
    } else {
      setFilterState([...filterState, value]);
    }
  };
  const applyFilter = () => {
    let productsCopy = products.slice();
  
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (frameType.length > 0) {
      productsCopy = productsCopy.filter((item) => frameType.includes(item.subCategory));
    }
    if (frameShape.length > 0) {
      productsCopy = productsCopy.filter((item) => frameShape.includes(item.subCategory));
    }
    if (size.length > 0) {
      productsCopy = productsCopy.filter((item) => item.sizes.some((s) => size.includes(s)));
    }
    if (gender.length > 0) {
      productsCopy = productsCopy.filter((item) => gender.includes(item.Category));
    }
    productsCopy = productsCopy.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
  
    setFilterProducts(productsCopy);
  };
  

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const clearFilters = () => {
    setFrameType([]);
    setFrameShape([]);
    setSize([]);
    setGender([]);
    setPriceRange([0, 500]);
  };

  useEffect(() => {
    applyFilter();
  }, [frameType, frameShape, size, gender, priceRange, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>

       {/* Frame Type Filters */}
       <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">FRAME TYPE</p>
          {['Full Rim', 'Half Rim', 'Rimless'].map((type) => (
            <label key={type} className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value={type}
                onChange={() => toggleFilter(frameType, setFrameType, type)}
                checked={frameType.includes(type)}
              />
              {type}
            </label>
          ))}
        </div>
        
         {/* Frame Shape Filters */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">FRAME SHAPE</p>
          {['Aviators', 'Wayfarer', 'Rounded', 'Sports Sunglasses'].map((shape) => (
            <label key={shape} className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value={shape}
                onChange={() => toggleFilter(frameShape, setFrameShape, shape)}
                checked={frameShape.includes(shape)}
              />
              {shape}
            </label>
          ))}
        </div>

        {/* Size Filters */}
<div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
  <p className="mb-3 text-sm font-medium">SIZE</p>
  {['S', 'M', 'L','XL'].map((sizeOption) => (
    <label key={sizeOption} className="flex gap-2 cursor-pointer">
      <input
        className="w-3"
        type="checkbox"
        value={sizeOption}
        onChange={() => toggleFilter(size, setSize, sizeOption)}
        checked={size.includes(sizeOption)}
      />
      {sizeOption}
    </label>
  ))}
</div>


        

 {/* Price Range Slider */}
 <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <p>${priceRange[0]} - ${priceRange[1]}</p>
        </div>

        {/* Clear Filters Button */}
        <button
          className={`px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* View Product Items */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="px-2 text-sm border-2 border-gray-300"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
