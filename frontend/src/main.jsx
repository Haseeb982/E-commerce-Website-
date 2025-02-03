import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/rooter';
import 'remixicon/fonts/remixicon.css';
import './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
