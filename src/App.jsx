import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductsPage from "./pages/Products";
import PrivateRoute from "./components/routes/Privateroute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import DeviceDetails from "./pages/DeviceDetails";
import CreateDevice from "./pages/CreateDevice";
import EditDevice from "./pages/EditDevice";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-device"
        element={
          <PrivateRoute>
            <CreateDevice />
          </PrivateRoute>
        }
      />
      <Route
        path="/device/:id"
        element={
          <PrivateRoute>
            <DeviceDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-device/:id"
        element={
          <PrivateRoute>
            <EditDevice />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
