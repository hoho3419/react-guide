import React from 'react';
import { useParams,Link } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams();
  console.log(params)
    

  return (
    <div>
      <h1>Product Detail Page</h1>
      <div>
        {params.id}
      </div>
      <Link to={'..'} relative='path'>Back</Link>
    </div>
  );
};

export default ProductDetail;