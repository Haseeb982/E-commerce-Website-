# VibeStore e-commerce Website

This is a fully functional eCommerce website built using the MERN (MongoDB, Express, React, Node.js) stack. It includes features such as product listing, user authentication, shopping cart management, and secure payment processing. The project also utilizes Redux for state management and React Router for navigation.

## Features

- User authentication (Register/Login)
- Product listing with details
- Shopping cart functionality
- Secure payment processing
- Order history and management
- Admin dashboard for product and user management
- Redux for global state management
- React Router for client-side routing
- Responsive design for all devices

## Tech Stack

- **Frontend:** React.js, Redux, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB Atlas
- **State Management:** Redux Toolkit
- **Routing:** React Router

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ecommerce-mern.git
   cd ecommerce-mern
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_key
   ```

4. Start the development server:
   ```sh
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend server
   cd frontend
   npm start
   ```
![eCommerce Screenshot](https://github.com/Haseeb982/E-commerce-Website-/blob/29808e1014da95cb21d3534739f26e972876f24a/ecommerce.PNG)

5. Open `http://localhost:3000` in your browser.

## Contributing
Pull requests are welcome! If you'd like to contribute, please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

