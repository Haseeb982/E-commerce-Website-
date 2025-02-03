import React from 'react';
import { Link } from 'react-router-dom';
import RatingStar from '../../components/ratingStar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="product__card">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt="product image"
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 duration-300 transition-all"
              ></img>
            </Link>

            <div className="absolute top-3 right-3">
              <button
                className="bg-red-700 icon-cart text-white hover:bg-black transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <i className="ri-shopping-cart-line"></i>
              </button>
            </div>
          </div>

          {/* product description */}
          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              {product.price}
              {product?.oldPrice ? <s>{product?.oldPrice}</s> : null}
            </p>
            <RatingStar rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
