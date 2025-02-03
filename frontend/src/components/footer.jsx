import React from 'react';
import instragram1 from '../assets/instagram-1.jpg';
import instragram2 from '../assets/instagram-2.jpg';
import instragram3 from '../assets/instagram-3.jpg';
import instragram4 from '../assets/instagram-4.jpg';
import instragram5 from '../assets/instagram-5.jpg';
import instragram6 from '../assets/instagram-6.jpg';

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            123, London Bridge Street, London
          </p>
          <p>
            <span>
              <i class="ri-mail-line"></i>
            </span>
            abc@gmail.com
          </p>
          <p>
            <span>
              <i class="ri-phone-line"></i>
            </span>
            (+012) 2342 234
          </p>
        </div>

        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Work With Us</a>
          <a href="/">Our Blogs</a>
          <a href="/">Team & Condition</a>
        </div>

        <div className="footer__col">
          <h4>USEFULL Links</h4>
          <a href="/">Help</a>
          <a href="/">Track Your Order</a>
          <a href="/">Men</a>
          <a href="/">Women</a>
          <a href="/">Dresses</a>
        </div>

        <div className="footer__col">
          <div className="instagram__grid">
            <img src={instragram1} alt=""></img>
            <img src={instragram2} alt=""></img>
            <img src={instragram3} alt=""></img>
            <img src={instragram4} alt=""></img>
            <img src={instragram5} alt=""></img>
            <img src={instragram6} alt=""></img>
          </div>
        </div>

        <div className="footer__bar">
          copyright @ 2025 by All rights reserved
        </div>
      </footer>
    </>
  );
};

export default Footer;
