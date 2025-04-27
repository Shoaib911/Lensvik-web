import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const OnSale = () => {
  const { products } = useContext(ShopContext);
  const [onSaleProducts, setOnSaleProducts] = useState([]);

  useEffect(() => {
    // ✅ Correct backend field: onSale (not OnSale)
    const filtered = products.filter((item) => item.onSale);
    setOnSaleProducts(filtered.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"On Sale"} text2={"Products"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Discover incredible deals on our top-selling eyewear! 
          Shop our handpicked selection of stylish, 
          high-quality frames and lenses at unbeatable prices. 
          Limited-time offers—grab your favorites before they are gone!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {onSaleProducts.length > 0 ? (
          onSaleProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.originalPrice}
              salePrice={item.salePrice}
              OnSale={item.onSale}
              sizes={item.sizes}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No Products on Sale.
          </div>
        )}
      </div>
    </div>
  );
};

export default OnSale;
