import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  //console.log(props);
  const { name, img, seller, stock, price,key } = props.product;
  return (
    <div className="product"> 
      <div>
        <img src={img} alt="" />
      </div>
      <div className="infoProduct">
        <h4 className="productName" > <Link to={"/product/"+key}>{name}</Link></h4>
        
        <p>
          <small>Brand: {seller}</small>
        </p>
        
        <p>${price}</p>

        <p>only {stock} left in stock - order soon</p>
        {props.showAddCart &&  <button
            className="addCartBtn"
            onClick={() => props.handleAddProduct(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>}
      </div>
    </div>
  );
};

export default Product;
