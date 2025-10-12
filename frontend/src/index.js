import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { Store } from './app/Store.jsx';
import { Provider } from 'react-redux';
import Landingpage from './Screens/Landingpage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shoppingcart from './Components/Shoppingcart.jsx';
import Producdetail from './Components/Productdetail.jsx';
import Allproducts from './Screens/Allproducts.jsx';
import LoginSignup from './Screens/Login-Signup.jsx';
import AboutUs from './Components/AboutUs.jsx';
import ContactUs from './Components/ContactUs.jsx';
import Orders from './Components/Orders.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage/>,
  },
  {
    path: "product",
    element: <Producdetail/>,
  },
  {
    path: "shoppingcart",
    element: <Shoppingcart/>
  }, {
    path: "allproducts",
    element: <Allproducts/>
  },
  {
    path: "LoginSignup",
    element: <LoginSignup/>
  },
  {
    path: "about",
    element: <AboutUs/>
  },
  {
    path: "contact",
    element: <ContactUs/>
  },
  {
    path: "orders",
    element: <Orders/>
  },



]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      
    <Provider store={Store}>
    <RouterProvider router={router}>
 
    </RouterProvider>
    </Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
