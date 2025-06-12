import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";




const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
      const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/dashboard", {
            method: "GET",
            credentials: "include",
          });

          const data = await response.json();
          setProducts(data);
          setFiltered(data);
          
          //EXTRACT BRANDS AND CATEGORIES FROM PRODUCT DATA (UNIQUE VALUES ONLY)
          const brandSet = new Set();
          const categorySet = new Set();

          data.forEach(product => {
            if (product.brand?.name) {
              brandSet.add(product.brand.name);
            }
            if (product.category?.name) {
              categorySet.add(product.category.name);
            }
          });

          setBrands(Array.from(brandSet));
          setCategories(Array.from(categorySet));

          console.log(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } 
        finally {
          await new Promise(resolve => setTimeout(resolve, 500));
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);

    const applyFilters = (searchText, brand, category) => {
      let filteredData = [...products];

      if (brand) {
        filteredData = filteredData.filter(
          (product) => product.brand?.name?.toLowerCase() === brand.toLowerCase()
        );
      }

      if (category) {
        filteredData = filteredData.filter(
          (product) => product.category?.name?.toLowerCase() === category.toLowerCase()
        );
      }

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
      applyFilters(search, selectedBrand, selectedCategory);
    }, [search, selectedBrand, selectedCategory, products]);

    if (loading) {

      return <LoaderPage />;
    }

  
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRemoveFilter = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSearch("");
    setFiltered(products);
  };

  

  return (
    <>
      <div>
        <h2>Products</h2>

        {/* SEARCH BAR */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // 🔧 Filters apply on every keystroke
          />
        </div>

        {/* BRAND FILTER */}
        <div>
          <strong>Brands: </strong>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              style={{
                backgroundColor: selectedBrand === brand ? "skyblue" : "lightgray",
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* CATEGORY FILTER */}
        <div>
          <strong>Categories: </strong>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                backgroundColor: selectedCategory === category ? "skyblue" : "lightgray",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* CLEAR FILTER BTN */}
        {(selectedBrand || selectedCategory || search) && (
          <div>
            <button onClick={handleRemoveFilter}>
              Clear Search and Filters
            </button>
          </div>
        )}

        {filtered.map((product) => (
        <Link
          to={`/products/${product._id}`}
          key={product._id}
        >
            <div>
              <img 
                src={product.image.url.replace("/upload/", "/upload/c_fill,w_200,h_112/")} 
                alt={product.name} 
                style={{ width: "200px", height: "112px", objectFit: "cover"}}
              />
              <h3>{product.name}</h3>
              {/* <p>{product.brand.name}</p> */}
              <p>{product.price}</p>
            </div>
          
        </Link>
        ))}
      </div>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
    </>
  )
}

export default Dashboard
