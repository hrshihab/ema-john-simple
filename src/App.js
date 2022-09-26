import "./App.css";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import Shop from "./components/Shop/Shop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>email: {loggedInUser.email}</h2>

      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route
            path="/product/:productKey"
            element={<ProductDetails />}
          ></Route>
          <Route path="/Shop" element={<Shop />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route  element={<PrivateRoute />}>
            <Route path="/shipment" element={<Shipment />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
