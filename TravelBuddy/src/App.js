//import logo from './logo.svg';
import './App.css';
import ProtectedRoute from './Components/ProtectedRoute';
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
             <Route exact path="/login" element={ <Login />} />
            <Route exact path="/register" element={ <Register />} />
            <Route exact path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route exact path="/about" element={ <ProtectedRoute>  <About />  </ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
