
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (query.length > 1) {
        fetch(`http://localhost:8080/search?query=${query}`)
          .then((res) => res.json())
          .then((data) => setResults(data.data))
          .catch((err) => console.error("Error fetching data:", err));
      } else {
        setResults([]);
      }
    }, [query]);

    console.log(results);
    return (
      <div className="container">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-box"
        />
        {results.length > 0 && (
          <ul className="dropdown">
            {results.map((product) => (
              <li key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                {/* <img src={product.imageURL} alt={product.productName} className="product-image" /> */}
                {product.productName}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};
  

export default SearchPage;