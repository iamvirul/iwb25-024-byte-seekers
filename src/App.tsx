import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BlockchainProvider } from "./contexts/BlockchainContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandOfficerDashboard from "./pages/LandOfficerDashboard";
import LegalOfficerDashboard from "./pages/LegalOfficerDashboard";
import LandRegistry from "./pages/LandRegistry";
import PropertySearch from "./pages/PropertySearch";
import Transactions from "./pages/Transactions";
import Disputes from "./pages/Disputes";
import Documents from "./pages/Documents";
import SmartContracts from "./pages/SmartContracts";
import Profile from "./pages/Profile";
import LandChainPage from "./pages/LandChainPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["land_owner"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/land-officer"
                element={
                  <ProtectedRoute allowedRoles={["land_officer"]}>
                    <LandOfficerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/legal-officer"
                element={
                  <ProtectedRoute allowedRoles={["legal_official"]}>
                    <LegalOfficerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/registry" element={<LandRegistry />} />
              <Route path="/search" element={<PropertySearch />} />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute allowedRoles={["land_owner"]}>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route path="/disputes" element={<Disputes />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "land_owner",
                      "land_officer",
                      "legal_official",
                    ]}
                  >
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/land/:landId" element={<LandChainPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BlockchainProvider>
    </AuthProvider>
  );
}

export default App;
