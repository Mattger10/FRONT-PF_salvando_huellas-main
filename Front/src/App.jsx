import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LandingPage from "./components/LandingPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from './components/Home.jsx';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element ={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
