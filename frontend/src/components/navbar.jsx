import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CartModel from '../pages/shop/cartModel';
import avaterImage from '../assets/avatar.png';
import { useLogOutUserMutation } from '../redux/features/auth/authApi';
import { logOut } from '../redux/features/auth/authSlice';

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isOpenCart, setisOpenCart] = useState(false);
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log('user data', user);
  const [logOutUser] = useLogOutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCartToggle = () => {
    setisOpenCart(!isOpenCart);
  };

  const handleDropDownToggle = () => {
    setisDropDownOpen(!isDropDownOpen);
  };

  const handleLogOut = async () => {
    try {
      await logOutUser().unwrap();
      dispatch(logOut());
      navigate('/');
    } catch (error) {
      console.log('failed logout', error);
    }
  };

  const adminDropDownMenus = [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Item', path: '/dashboard/manage-products' },
    { label: 'All Orders', path: '/dashboard/manage-orders' },
    { label: 'Add New Post', path: '/dashboard/add-new-post' },
  ];

  const userDropDownMenus = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Orders', path: '/dashboard/orders' },
  ];

  const dropDownMenus =
    user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/">Pages</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">VibeStore</Link>
        </div>

        {/* Nav Icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-2-line"></i>
            </Link>
          </span>
          <span>
            <button
              onClick={handleCartToggle}
              className="hover:text-primary relative"
            >
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block cart-logo text-white rounded-full bg-red-800 text-center absolute">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avaterImage}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setisDropDownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link className="dropdown-items" onClick={handleLogOut}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isOpenCart && (
        <CartModel
          products={products}
          isOpen={isOpenCart}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
}

export default Navbar;
