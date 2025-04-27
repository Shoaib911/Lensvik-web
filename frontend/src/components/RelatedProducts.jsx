import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const related = products.filter((item) => {
        if (item._id === currentProductId) return false; // Exclude current product

        const categoriesArray = item.categories || [];

        // Check if ANY category + subcategory matches
        return categoriesArray.some(cat => {
          const catMain = cat.category?.toLowerCase() || "";
          const catSubcategories = cat.subCategories?.map(sub => sub.toLowerCase()) || [];

          return (
            catMain === (category?.toLowerCase() || "") &&
            catSubcategories.includes(subCategory?.toLowerCase() || "")
          );
        });
      });

      setRelatedProducts(related.slice(0, 5)); // Show only 5 related
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-24">
      <div className="py-2 text-3xl text-center">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
          {relatedProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.originalPrice}
              salePrice={item.salePrice}
              OnSale={item.onSale}
              sizes={item.sizes}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No related products found.
        </div>
      )}
    </div>
  );
};

RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  currentProductId: PropTypes.string.isRequired,
};

export default RelatedProducts;
