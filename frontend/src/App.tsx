import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/Store";
import { MainNavBar } from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/Product";
import AppContextProvider from "./context/AppContext";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const id = location.state?.id || "";
  return (
    <>
      <AppContextProvider>
        <MainNavBar />
        <Toaster position="bottom-right" reverseOrder={false} />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Store /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product" element={<ProductPage id={id} />} />
          </Routes>
        </Container>
      </AppContextProvider>
    </>
  );
}

export default App;
