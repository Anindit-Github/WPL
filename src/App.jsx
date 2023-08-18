import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {LandingPage} from './components/LandingPage';
import UserDetails from './components/UserDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
