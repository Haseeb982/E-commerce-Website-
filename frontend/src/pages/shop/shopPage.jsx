import React, { useState } from 'react';
import ProductCard from './productCard';
import Shopfilters from './shopfilters';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'silver', 'beige', 'green'],
  priceRanges: [
    { label: 'under 50$', min: 0, max: 50 },
    { label: '50$ - 100$', min: 50, max: 100 },
    { label: '100$ - 200$', min: 100, max: 200 },
    { label: '200$ and above', min: 0, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filterState, setfilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;
  console.log('price range', category, color, priceRange);
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  console.log('real thing', {
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? minPrice : '',
    maxPrice: isNaN(maxPrice) ? maxPrice : '',
    page: currentPage,
    limit: Number(productsPerPage),
  });

  const {
    data: { products = [], totalPage, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: Number(productsPerPage),
  });

  const clearFilters = () => {
    setfilterState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
    setcurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setcurrentPage(pageNumber);
    }
  };

  if (error) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container bg-pink-100">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Explore our diverse categories, curated to meet all your needs. From
          fashion and accessories to home essentials, discover the perfect picks
          for every occasion and lifestyle.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Left side - Filters */}
          <Shopfilters
            filters={filters}
            filterState={filterState}
            setfilterState={setfilterState}
            clearFilters={clearFilters}
          />

          {/* Right side - Products */}
          <div>
            <h3 className="text-xl font-medium title">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCard products={products} />

            <div className="page-gap flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="page bg-gray-300 text-gray-700 rounded-md cursor-pointer"
              >
                Previous
              </button>
              {[...Array(totalPage)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`page-button ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-700 cursor-pointer'
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className="page bg-gray-300 text-gray-700 rounded-md cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
