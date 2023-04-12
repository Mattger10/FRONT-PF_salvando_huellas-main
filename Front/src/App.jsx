import { LoginButton, LogoutButton } from './components/LandingPage.jsx';
import { Profile } from './components/LandingPage.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/LandingPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import Home from './components/Home.jsx';

import "./App.css";

function App() {

  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element ={<Home/>}/>
      </Routes>
      {isAuthenticated ? ( 
      <>
        <Profile/>
        <LogoutButton/>
      </>
     ) : ( <LoginButton/>
  )}
    </div>
    </BrowserRouter>
  );
}

export default App;

