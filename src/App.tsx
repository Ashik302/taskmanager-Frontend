import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'; // You can replace this with the path to your styles if needed

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';




const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Route for Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Route for Register */}
          <Route path="/register" element={<Register />} />
          
          {/* Route for Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Redirect from / to /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
