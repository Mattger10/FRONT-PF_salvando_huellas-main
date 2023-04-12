import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar.jsx";
import Home from './components/Home/Home.jsx';

import "./App.css";

function App() {

  

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element ={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

