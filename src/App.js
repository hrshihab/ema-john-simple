import './App.css';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <div>
      
        <Header></Header>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Shop></Shop>}></Route>
          <Route path='/review' element={<Review/>}></Route>
          <Route path='/inventory' element={<Inventory/>}></Route>
          <Route path='/product/:productKey' element={<ProductDetails/>}></Route>
          <Route path='/Shop' element={<Shop/>}></Route>
        </Routes>
        </BrowserRouter>
        
        
        
      
    </div>
  );
}

export default App;
