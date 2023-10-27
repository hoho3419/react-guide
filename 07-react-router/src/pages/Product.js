import React from 'react';
import { Link } from 'react-router-dom';

const PRODUCT = [
  {id: 'p1', title: 'product - 1'},
  {id: 'p2', title: 'product - 2'},
  {id: 'p3', title: 'product - 3'},
]

const ProductPage = () => {
  return (
    <div>
      <h1>The Product Page</h1>
      <ul>
        {PRODUCT.map((prod) => (
          <li key={prod.id}> 
            <Link to={prod.id}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;