import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const SubCategoryPage = () => {
  const { subCategory } = useParams();
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [size, setSize] = useState([]);
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

    const selectedCategory = subCategory.toLowerCase();

    // Filter by selected sub category
    productsCopy = productsCopy.filter(
        (item) => item.subCategory.toLowerCase() === selectedCategory
      );

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply size filter (fix: use .some() for array)
    if (size.length > 0) {
        productsCopy = productsCopy.filter((item) =>
          size.some((s) => item.sizes.includes(s))
        );
      }

    productsCopy = productsCopy.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(sortedProducts);
  };

  const clearFilters = () => {
    setSize([]);
    setPriceRange([0, 500]);
  };

  useEffect(() => {
    console.log("Filtering with sizes:", size); // Debugging
    applyFilter();
  }, [size, priceRange, search, showSearch, subCategory, products]); // Include `subCategory`
  
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

        {/* Size Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">SIZE</p>
          {['S', 'M', 'L', 'XL'].map((sizeOption) => (
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
            min="200"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <p>${priceRange[0]} - ${priceRange[1]}</p>
        </div>

        {/* Clear Filters Button */}
        <button
          className={`px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900 ${showFilter ? "block" : "hidden"} sm:block`}
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* View Product Items */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1={subCategory.toUpperCase()} text2={"COLLECTIONS"} />
          
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

        {/* Display Products */}
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

export default SubCategoryPage;
