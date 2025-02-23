import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const {productId} = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:8080/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProduct(data.data))
        .catch((err) => console.error("Error fetching product details:", err));
    }, [productId]);
  
    if (!product) return <p>Loading...</p>;
  
    return (
      <div className="product-details">
        <h1>{product.productName}</h1>
        {/* <img src={product.imageURL} alt={product.productName} className="product-image-large" /> */}
        <p>{product.description}</p>
        <p>Price: ₹{product.price}</p>
        <p>Stock: {product.availableStock}</p>
        <p>Category: {product.category}</p>
      </div>
    );
};


  export default ProductPage;