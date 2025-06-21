import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BlockchainProvider } from './contexts/BlockchainContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandRegistry from './pages/LandRegistry';
import PropertySearch from './pages/PropertySearch';
import Transactions from './pages/Transactions';
import Disputes from './pages/Disputes';
import Documents from './pages/Documents';
import SmartContracts from './pages/SmartContracts';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BlockchainProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/registry" element={<LandRegistry />} />
              <Route path="/search" element={<PropertySearch />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/disputes" element={<Disputes />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/contracts" element={<SmartContracts />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BlockchainProvider>
    </AuthProvider>
  );
}

export default App;