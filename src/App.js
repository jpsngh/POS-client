import React, { Children } from 'react';
import "antd/dist/antd-with-locales"
import './App.css';
import { Navigate } from'react-router-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={
          <ProtectedRoute> <Homepage /></ProtectedRoute>} />
          <Route path="/items" element={
          <ProtectedRoute><ItemPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute> <Orders /></ProtectedRoute>} />
          <Route path="/customer" element={<ProtectedRoute> <Customer /></ProtectedRoute>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

export function ProtectedRoute({children}) {

    if (sessionStorage.getItem('auth')) {
      return children
    } else {
      return <Navigate to="/login"></Navigate>
    }
  }
