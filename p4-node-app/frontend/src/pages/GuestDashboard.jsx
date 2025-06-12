import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";

const GuestDashboard = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchPublicProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/guest-dashboard");
        const data = await response.json();
        setProducts(data);
        setFiltered(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching public products:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchPublicProducts();
  }, []);

  

  const applyFilters = (searchText) => {
    let filteredData = [...products];

    if (searchText.trim() !== "") {
      filteredData = filteredData.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.price.toString().includes(searchText)
      );
    }

    setFiltered(filteredData);
  };

  //FOR SEARCH AND FILTER OF BRAND AND CATEGORIES
  useEffect(() => {
    applyFilters(search);
  }, [search, products]);

  const handleRemoveFilter = () => {
    setSearch("");
    setFiltered(products);
  };

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <div>
      <h2>Public Products</h2>
      <a href="/login">Please Login to access the full features of the App</a>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* CLEAR SEARCH BTN */}
      {(search) && (
        <div>
          <button onClick={handleRemoveFilter}>
            Clear Search
          </button>
        </div>
      )}
      <div>
        {filtered.map((product) => (
          <div key={product._id}>
              <img 
                src={product.image.url.replace("/upload/", "/upload/c_fill,w_200,h_112/")} 
                alt={product.name} 
                style={{ width: "200px", height: "112px", objectFit: "cover"}}
              />
              <h3>{product.name}</h3>
              {/* <p>{product.brand.name}</p> */}
              <p>{product.price}</p>
            </div>
        ))}
      </div>
    </div>
  );

};

export default GuestDashboard;