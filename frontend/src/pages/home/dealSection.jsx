import React from 'react';
import dealsImg from '../../assets/deals.png';

const DealSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt=""></img>
      </div>

      <div className="deals__content">
        <h5>GET UP TO 20% Discount</h5>
        <h4>Deals of this month</h4>
        <p>
          Discover our exclusive Women's Best Collection, featuring timeless
          styles and modern designs. From elegant dresses to casual essentials,
          find everything you need to express your unique style with confidence.
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>

          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>

          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealSection;
