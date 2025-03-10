import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const ProductItem = ({ id, image, name, price, salePrice, OnSale, sizes }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer border" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out hover:scale-110"
          src={image[0]}
          alt="Product"
        />
      </div>
      <p className="pt-3 pb-1 text-sm px-2">{name}</p>
      
      {/* Display Available Sizes */}
      {sizes && sizes.length > 0 && (
        <p className="text-s font-medium mt-2 mb-2 text-gray-500 px-2">
          Sizes: {sizes.join(", ")}
        </p>
      )}

      {/* Display Price & Sale Price */}
      <p className="text-sm font-medium px-2 mb-2">
        {OnSale ? (
          <span className="text-red-600">
            {currency}&nbsp;
            {salePrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        ) : (
          <span>
            {currency}&nbsp;
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        )}
        {OnSale && (
          <span className="ml-2 text-gray-500 line-through">
            {currency}&nbsp;
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        )}
      </p>
    </Link>
  );
};

// Define PropTypes
ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  salePrice: PropTypes.number,
  OnSale: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.string), // Prop validation for sizes
};

export default ProductItem;
