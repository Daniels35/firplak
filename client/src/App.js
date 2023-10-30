import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Pod from './pages/Pods/Pod';
import PodsDetail from './pages/PodsDetail/PodsDetail';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pod" element={<Pod />} />
        <Route path="/pod/:id" element={<PodsDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
