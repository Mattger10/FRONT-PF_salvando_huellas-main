import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Donation from './components/Donations/Donations.jsx';
import Dogs from './components/Dogs/Dogs.jsx';
import Home from "./components/Home/Home.jsx";
import Form from  "./components/FormAdoption/Form.jsx"
import Shop from "./components/Shop/Shop.jsx";
import Trolley from "./components/Trolley/Trolley.jsx";
import History from "./components/History/History.jsx";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar /> /* RENDERIZA NAVBAR EN TODO MENOS LANDINGPAGE */}
      <Routes>
      <Route path="/donar" element={<Donation/>}/>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/dogs" element ={<Dogs/>}/>
        <Route path="/carrito" element={<Trolley/>} />
        <Route path="/donar" element={<Donation />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adopt" element={<Form />} />
        <Route path="/about" element={<History/>} />

      </Routes>
    </div>
  );
}

export default App;
