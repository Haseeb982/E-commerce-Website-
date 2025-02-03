import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';

const OrderSumary = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  console.log(useSelector((store) => store.cart));
  const { tax, taxRate, grandTotal, totalPric, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="bg-pink-100 order-sum rounded text-base">
      <div className="inner-sum">
        <h2 className="text-xl text-black">Order Summary</h2>
        <p className="text-black text-sum-1">Selected Items: {selectedItems}</p>
        <p className="text-sum-1">
          Tax ({taxRate * 100}%: ${grandTotal.toFixed(2)})
        </p>
        <h3 className="font-bold text-sum-1">
          GrandTotal: ${grandTotal.toFixed(2)}
        </h3>
        <div className="btn-sum">
          <button
            onClick={(e) => {
              e.stopPropagation(), handleClearCart();
            }}
            className="bg-red-500 review-btn text-white btn-sum-1 rounded-md flex justify-between items-center mb-4 "
          >
            <span className="mr-2">Clear Cart</span>
            <i className="ri-delete-bin-7-line"></i>
          </button>
          <button className="bg-green-600 review-btn-green text-white btn-sum-2 rounded-md flex justify-between items-center">
            <span className="mr-2">Proceed Checkout</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSumary;
