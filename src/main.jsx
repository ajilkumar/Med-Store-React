import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './Context/userContext.jsx';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Add from './Pages/Add.jsx';
import Update from './Pages/Update.jsx';
import View from './Pages/View.jsx';


const router = createBrowserRouter([
  { path : '/register', element :<Register />},
  { path : '/', element :<Login />},
  { path : '/home', element :<Home />},
  { path : '/add', element :<Add />},
  { path : '/update/:medicineId', element :<Update />},
  { path : '/view/:medicineId', element :<View />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>
);
