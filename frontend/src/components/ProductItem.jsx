import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({ id, image, name, price, salePrice, OnSale, sizes }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer border rounded-md overflow-hidden flex flex-col h-full" to={`/product/${id}`}>
      {/* Image Section */}
      <div className="h-60 w-full bg-white flex items-center justify-center overflow-hidden">
        <img
          className="object-contain h-full w-full transition ease-in-out hover:scale-110"
          src={image[0]}
          alt={name}
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-between flex-grow p-3">
        <p className="text-base font-semibold mb-2 line-clamp-2">{name}</p>

        {sizes && sizes.length > 0 && (
          <p className="text-xs font-medium text-gray-500 mb-2">
            Sizes: {sizes.join(", ")}
          </p>
        )}

        <div className="mt-auto text-sm font-semibold">
          {OnSale ? (
            <>
              <span className="text-red-600">
                {currency}&nbsp;
                {salePrice.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-400 line-through">
                {currency}&nbsp;
                {price.toFixed(2)}
              </span>
            </>
          ) : (
            <span>
              {currency}&nbsp;
              {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  salePrice: PropTypes.number,
  OnSale: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.string),
};

export default ProductItem;
