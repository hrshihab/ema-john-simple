import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import '../Shop/Shop.css'
import happyImage from '../../images/giphy.gif'
import { Link, useNavigate } from 'react-router-dom';

const Review = () => {
  const [cart,setCart] =useState([]);
  const [orderPlaced,setOrderPlaced] = useState(false);
let navigate = useNavigate();

  const handlePlaceOrder= ()=>{
navigate("/shipment");

  }
  const removeProduct = (productKey) =>{
    const newCart=cart.filter(pd => pd.key !== productKey )
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    //const counts = productKeys.map(key => savedCart[key]);
    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    },);
    setCart(cartProducts);
  },[])
  let thankyou;
  if(orderPlaced)
  {
    thankyou = <img src={happyImage} alt="" srcset="" />
  }
  return (
    <div className='shop-container'>
      <div className='product-container'>
      {
        cart.map((pd,idx) => <ReviewItem key={idx} product={pd} removeProduct={removeProduct}></ReviewItem>)
      }
      {thankyou}
      </div>
      <div className='cart-container'>
        <Cart cart={cart}>
          <button className='addCartBtn' onClick={handlePlaceOrder} >Proceed Order</button>
          
        </Cart>
      </div>
      
      
    </div>
  );
};

export default Review;