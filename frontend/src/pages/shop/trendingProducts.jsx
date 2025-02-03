import React from 'react';
import { useState } from 'react';
import ProductCard from './productCard';
import products from '../../data/products.json';

const TrendingProducts = () => {
  const [visibleProducts, setvisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setvisibleProducts((prevCount) => prevCount + 2);
  }; 

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">
        Disover the Hotest Picks: Elevate Your Style with our Curated Collection
        of Trending Women's Fashion Products.
      </p>

      {/* product cards */}
      <ProductCard products={products.slice(0, visibleProducts)} />

      {/* load more product btn */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;



