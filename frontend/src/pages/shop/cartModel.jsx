import React from 'react';
import OrderSumary from './orderSumary';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
} from '../../redux/features/cart/cartSlice';

const CartModel = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (type, id) => {
    const payload = { type, id };
    console.log('frnt update id', payload);
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    console.log('frnt id', { id });
    dispatch(removeFromCart({ id }));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black/50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } `}
      style={{ transition: 'opacity 300ms' }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.-94)',
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl text-cart font-semibold">Your Cart</h4>
            <button
              onClick={onClose}
              className="text-gray-600 cross-icon-parent hover:text-gray-900 "
            >
              <i className="ri-xrp-fill bg-black cross-icon text-white rounded-2xl"></i>
            </button>
          </div>

          {/* cart details */}
          <div className="cart-items">
            {products.length === 0 ? (
              <div className="text-cart-child">Your Cart is Empty</div>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="image-cart rounded-lg object-cover"
                    ></img>
                    <div className="text-cart-div">
                      <h5 className="text-lg font-medium text-cart-1">
                        {item.name}
                      </h5>
                      <p className="text-gray-500 text-sm ">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-row md:justify-start justify-end items-center mt-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity('decrement', item.id)
                        }
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white sub"
                      >
                        -
                      </button>
                      <span className="px-2 text-center mx-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity('increment', item.id)
                        }
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white add"
                      >
                        +
                      </button>

                      <button
                        onClick={(e) => handleRemove(e, item.id)}
                        className="text-red-500 hover:text-red-500 remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* calculations */}
          {products.length > 0 && <OrderSumary />}
        </div>
      </div>
    </div>
  );
};

export default CartModel;
