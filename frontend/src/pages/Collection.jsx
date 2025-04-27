import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Categories from "../components/Categories";

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
      productsCopy = productsCopy.filter((item) =>
        item.categories.some((cat) => frameType.includes(cat.subCategories[0]))
      );
    }
    if (frameShape.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.categories.some((cat) => frameShape.includes(cat.subCategories[0]))
      );
    }
    if (size.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.sizes.some((s) => size.includes(s))
      );
    }
    if (gender.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.categories.some((cat) => gender.includes(cat.category))
      );
    }

    productsCopy = productsCopy.filter((item) => {
      const price = item.onSale && item.salePrice ? item.salePrice : item.originalPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => {
          const priceA = a.onSale && a.salePrice ? a.salePrice : a.originalPrice;
          const priceB = b.onSale && b.salePrice ? b.salePrice : b.originalPrice;
          return priceA - priceB;
        });
        break;
      case "high-low":
        fpCopy.sort((a, b) => {
          const priceA = a.onSale && a.salePrice ? a.salePrice : a.originalPrice;
          const priceB = b.onSale && b.salePrice ? b.salePrice : b.originalPrice;
          return priceB - priceA;
        });
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(fpCopy);
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
  }, [products, frameType, frameShape, size, gender, priceRange, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <Categories />

      <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
        {/* Filters */}
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

          {/* Frame Type */}
          <div className={`border pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">FRAME TYPE</p>
            {["Full Rim", "Half Rim", "Rimless"].map((type) => (
              <label key={type} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3"
                  onChange={() => toggleFilter(frameType, setFrameType, type)}
                  checked={frameType.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>

          {/* Frame Shape */}
          <div className={`border pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">FRAME SHAPE</p>
            {["Aviators", "Wayfarer", "Rounded", "Sports Sunglasses"].map((shape) => (
              <label key={shape} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3"
                  onChange={() => toggleFilter(frameShape, setFrameShape, shape)}
                  checked={frameShape.includes(shape)}
                />
                {shape}
              </label>
            ))}
          </div>

          {/* Size */}
          <div className={`border pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">SIZE</p>
            {["S", "M", "L", "XL"].map((s) => (
              <label key={s} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3"
                  onChange={() => toggleFilter(size, setSize, s)}
                  checked={size.includes(s)}
                />
                {s}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className={`border pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <p>${priceRange[0]} - ${priceRange[1]}</p>
          </div>

          {/* Clear Filters Button */}
          <button
            className={`px-4 py-2 mt-4 text-white bg-black hover:bg-gray-900 ${
              showFilter ? "block" : "hidden"
            } sm:block`}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex justify-between mb-4 text-base sm:text-2xl">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="px-2 text-sm border-2 border-gray-300"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.onSale && item.salePrice ? item.salePrice : item.originalPrice}
                  salePrice={item.salePrice}
                  onSale={item.onSale}
                  sizes={item.sizes}
                />
              ))
            ) : (
              <p className="col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-500">
                No products found!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
