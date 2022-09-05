import React from 'react';

const ReviewItem = (props) => {
  const {name ,quantity,key,price} = props.product;
  const reviewItemStyle = {
    borderBottom:'1px solid lightgrey',
    marginBottom: '5px',
    paddingBottom:'15px',
    marginLeft:"200px" 
  }
  return (
    <div style={reviewItemStyle}>
      <h4>{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>Price : ${price}</p>
      <button className='addCartBtn' onClick={ ()=> props.removeProduct(key)}>Remove</button>
      
    </div>
  );
};

export default ReviewItem;