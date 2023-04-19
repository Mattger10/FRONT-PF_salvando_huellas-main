import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Donation from "./components/Donations/Donations.jsx";
import Dogs from "./components/Dogs/Dogs.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/FormAdoption/Form.jsx";
import Shop from "./components/Shop/Shop.jsx";
import Trolley from "./components/Trolley/Trolley.jsx";
import Account from "./components/Account/Account.jsx";
import History from "./components/History/History.jsx";
import DetailDogs from "./components/DetailDog/DetailDogs.jsx";
import AdminArticles from "./components/AdminArticles/AdminArticles.jsx";
import "./App.css";
import EditArticle from "./components/EditArticle/EditArticle.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {
        location.pathname !== "/" && (
          <NavBar />
        ) /* RENDERIZA NAVBAR EN TODO MENOS LANDINGPAGE */
      }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/adopt" element={<Form />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/:id" element={<DetailDogs />} />
        <Route path="/donar" element={<Donation />} />
        <Route path="/carrito" element={<Trolley />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<History />} />
        <Route path="/admin/articles/:id" element={<EditArticle />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
      </Routes>
    </div>
  );
}

export default App;
