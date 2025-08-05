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
import Disputes from "./pages/Disputes";
import Profile from "./pages/Profile";
import LandChainPage from "./pages/LandChainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingOverlay from "./components/LoadingOverlay";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
// import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <AuthProvider>
      <BlockchainProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <LoadingOverlay />
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
                  <ProtectedRoute allowedRoles={["legal_officer"]}>
                    <LegalOfficerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/registry" element={<ProtectedRoute allowedRoles={["land_officer"]}>
                <LandRegistry /></ProtectedRoute>} />
              <Route path="/search" element={<PropertySearch />} />

              <Route path="/disputes" element={
                <ProtectedRoute allowedRoles={["land_owner"]}>
                  <Disputes />
                </ProtectedRoute>
              } />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    allowedRoles={[
                      "land_owner",
                      "land_officer",
                      "legal_officer",
                    ]}
                  >
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/land/:landId" element={<LandChainPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </BlockchainProvider>
    </AuthProvider>
  );
}

export default App;
