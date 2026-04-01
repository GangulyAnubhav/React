//import logo from './logo.svg';
import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
