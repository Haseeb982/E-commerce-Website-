import React from 'react';
import Banner from './banner';
import Categories from './categories';
import HeroSection from './heroSection';
import TrendingProducts from '../shop/trendingProducts';
import DealSection from './dealSection';
import PromoBanner from './promoBanner';
import Blogs from '../blog/blogs';

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingProducts />
      <DealSection />
      <PromoBanner />
      <Blogs />
    </>
  );
};

export default Home;
