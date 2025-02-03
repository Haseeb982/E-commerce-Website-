import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import RatingStar from '../../../components/ratingStar';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/reviewsCard';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  console.log('data', data);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || {};
  console.log('product reviews', productReviews);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  if (error) return <p>Error...</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <section className="section__container bg-pink-100">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-red-500 ">
            <Link to="/">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
          </span>
          <span className="hover:text-red-500 ">
            <Link to="/shop">Shop</Link>
            <i className="ri-arrow-right-s-line"></i>
          </span>
          <span className="hover:text-red-500 ">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product image */}
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct.image}
              alt=""
              className="rounded-md w-full h-auto"
            ></img>
          </div>

          <div className="md:w-1/2 w-full custom-space-y">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct.name}
            </h3>
            <p className="text-xl text-red-400 mb-4">
              ${singleProduct?.price}{' '}
              {singleProduct?.oldPrice && <s>${singleProduct?.oldPrice}</s>}
            </p>
            <p className="text-gray-400 mb-4">{singleProduct.description}</p>

            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category:</strong>
                {singleProduct?.category}
              </p>
              <p>
                <strong>Color:</strong>
                {singleProduct?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating:</strong>
                <RatingStar rating={singleProduct?.rating} />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className="mt-6 review-btn card-btn rounded-md bg-red-500 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
