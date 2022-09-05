import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  //const total = cart.reduce((total,prd) => total+prd.price , 0);
  let total = 0;
  for (let index = 0; index < cart.length; index++) {
    const product = cart[index];
    total = total + product.price* product.quantity;

 
  }
  let shipping = 0 ;
  if(total < 50 && total > 0) shipping = 9.99;
  else if(total > 50) shipping = 5.99;

  const tax = (total /10 );
  const grandTotal = (total + tax + shipping);

  const formatNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision);
  }

  

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Ordered:{cart.length}</p>
      <p>Product Price : {formatNumber(total)}</p>
      <p>
        <small>Shipping Cost: {formatNumber(shipping)}</small>
      </p>
      <p><small>Tax + VAT : {formatNumber(tax)}</small></p>
      <p>Total Price : {formatNumber(grandTotal)}</p>

      {
        props.children
      }

    </div>
  );
};

export default Cart;
