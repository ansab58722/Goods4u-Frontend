import React, { Suspense, lazy } from 'react';
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

// Code splitting - lazy load routes for better performance
const Shoppingcart = lazy(() => import('./Components/Shoppingcart.jsx'));
const Producdetail = lazy(() => import('./Components/Productdetail.jsx'));
const Allproducts = lazy(() => import('./Screens/Allproducts.jsx'));
const LoginSignup = lazy(() => import('./Screens/Login-Signup.jsx'));
const AboutUs = lazy(() => import('./Components/AboutUs.jsx'));
const ContactUs = lazy(() => import('./Components/ContactUs.jsx'));
const Orders = lazy(() => import('./Components/Orders.jsx'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'linear-gradient(135deg, #F8F7FF 0%, #E8E2F4 100%)'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #E8E2F4',
      borderTop: '4px solid #7E57C2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landingpage/>,
  },
  {
    path: "product",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Producdetail/>
      </Suspense>
    ),
  },
  {
    path: "shoppingcart",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Shoppingcart/>
      </Suspense>
    )
  }, {
    path: "allproducts",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Allproducts/>
      </Suspense>
    )
  },
  {
    path: "LoginSignup",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginSignup/>
      </Suspense>
    )
  },
  {
    path: "about",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AboutUs/>
      </Suspense>
    )
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ContactUs/>
      </Suspense>
    )
  },
  {
    path: "orders",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Orders/>
      </Suspense>
    )
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
