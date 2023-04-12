import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LandingPage from './components/LandingPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import './App.css'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<LandingPage />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
