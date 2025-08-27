import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Latest from './pages/Latest';
import National from './pages/National';
import Sports from './pages/Sports';
import World from './pages/World';
import Business from './pages/Business';
import Entertainment from './pages/Entertainment';
import Technology from './pages/Technology';
import Health from './pages/Health';
import Opinion from './pages/Opinion';
import Videos from './pages/Videos';
import AdminDashboard from './pages/AdminDashboard';
import NewsDetail from './pages/NewsDetail';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 animate-fade-in">
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/national" element={<National />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/world" element={<World />} />
            <Route path="/business" element={<Business />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/health" element={<Health />} />
            <Route path="/opinion" element={<Opinion />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
