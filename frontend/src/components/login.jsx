import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await loginUser(data).unwrap();
      console.log('response', response);
      const { token, user } = response;
      dispatch(setUser(user));
      navigate('/');
    } catch (error) {
      console.log('error in login', error);
      setMessage('Please provide a valid email and password');
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white login rounded-lg shadow-md bg-login ">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Please Login
        </h2>
        <form className="m-login" onClick={handleLogin}>
          <div className="same-login">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full input-login border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="same-login">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full input-login border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full btn-submit bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        <div className="m-login text-center">
          <Link href="#" className="text-sm">
            Don't have an account?{' '}
            <Link
              className="text-sm text-indigo-500 hover:underline"
              to={'/register'}
            >
              Register
            </Link>{' '}
            here
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
