import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import products from '../../data/products.json';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setfilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <section className="section__container bg-pink-100">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Explore our diverse categories, curated to meet all your needs. From
          fashion and accessories to home essentials, discover the perfect picks
          for every occasion and lifestyle.
        </p>
      </section>

      <div className="section__container"></div>
    </>
  );
};

export default CategoryPage;
