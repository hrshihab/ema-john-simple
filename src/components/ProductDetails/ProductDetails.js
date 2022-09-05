import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
  const {productKey}=useParams();
  const product=fakeData.find(product => product.key===productKey)
  


  return (
    <div>
      <h3> Details Lagbo : </h3>
      <Product showAddCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;