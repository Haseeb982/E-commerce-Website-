import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4>UP TO 20% Discount on</h4>
        <h1>Girl' Fashion</h1>
        <p>
          Welcome to VibeStore, your one-stop destination for top-quality
          products at unbeatable prices. Discover a wide range of exclusive
          deals across categories like fashion, electronics, home goods, and
          more.
        </p>
        <button className="btn">
          <Link to="shop">EXPLORE MORE</Link>
        </button>
      </div>
      <div className="header__image">
        <img src="/main.png" alt="main image"></img>
      </div>
    </div>
  );
};

export default Banner;
