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
import DetailsArticle from "./components/DetailArticle/DetailArticle.jsx";
import DetailDogs from "./components/DetailDog/DetailDogs.jsx";
import Post from "./components/Post/Post.jsx";
import PostForm from "./components/Post/PostForm.jsx";
import React from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";

import "./App.css";

initMercadoPago("TEST-99c0a5cc-1346-4b33-9653-d582c80c7732");

import AdminArticles from "./components/AdminArticles/AdminArticles.jsx";
import EditArticle from "./components/EditArticle/EditArticle.jsx";
import "./App.css";
import AdminDogs from "./components/AdminDogs/AdminDogs.jsx";
import CreateDog from "./components/CreateDogForm/CreateDogForm.jsx";
import CreateArticle from "./components/CreateArticleForm/CreateArticleForm.jsx";
import EditDog from "./components/EditDog/EditDog.jsx";
import AdminUsers from "./components/AdminUsers/AdminUsers.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import AdminAdoptions from "./components/AdminAdoptions/AdminAdoptions.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {
        (location.pathname !== "/" && !location.pathname.includes("forgotpass") && !location.pathname.includes("resetpass")) && (
          <NavBar />
        ) /* RENDERIZA NAVBAR EN TODO MENOS LANDINGPAGE, RESETPASS Y FORGOTPASS */
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
        <Route path="/shop/DetailArticle/:id" element={<DetailsArticle />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<History />} />
        <Route path="/admin/articles/:id" element={<EditArticle />} />
        <Route path="/admin/articles/create" element={<CreateArticle />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/dogs/:id" element={<EditDog />} />
        <Route path="/admin/dogs/create" element={<CreateDog />} />
        <Route path="/admin/dogs" element={<AdminDogs />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/adoptions" element={<AdminAdoptions />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts/createpost" element={<PostForm />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpass" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
