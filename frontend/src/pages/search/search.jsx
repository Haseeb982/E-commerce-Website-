import React from 'react';
import { useState } from 'react';
import productData from '../../data/products.json';
import ProductCard from '../shop/productCard';

const Search = () => {
  const [searchQuery, setsearchQuery] = useState('');
  const [filteredProducts, setfilteredProducts] = useState(productData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productData.filter(
      (product) =>
        product.name.toLocaleLowerCase().includes(query) ||
        product.description.toLocaleLowerCase().includes(query)
    );

    setfilteredProducts(filtered);
  };

  return (
    <>
      <section className="section__container bg-pink-300">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Explore our diverse categories, curated to meet all your needs. From
          fashion and accessories to home essentials, discover the perfect picks
          for every occasion and lifestyle.Explore our diverse categories,
          curated to meet all your needs. From fashion and accessories to home
          essentials, discover the perfect picks for every occasion and
          lifestyle.
        </p>
      </section>

      <section className="section__search">
        <div className="w-full mb-10 flex flex-col md:flex-row items-center search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            className="w-full max-w-4xl p-2 border rounded search"
            placeholder="Search for products..."
          />

          <button
            className="w-full md:auto btn bg-red-500 text-white rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <ProductCard products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
