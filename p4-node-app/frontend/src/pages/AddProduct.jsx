import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [engineDisplacement, setEngineDisplacement] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resBrands = await fetch("http://localhost:3000/api/brands", {
          method: "GET",
          credentials: "include",
        });
      const resCategories = await fetch("http://localhost:3000/api/categories", {
          method: "GET",
          credentials: "include",
        });
      
      const brandsData = await resBrands.json();
      const categoriesData = await resCategories.json();
      
      setBrands(brandsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("engineDisplacement", engineDisplacement);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      console.log("Product created:", data);
      alert("Product successfully created!");
      navigate("/profile")
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Engine Displacement"
        value={engineDisplacement}
        onChange={e => setEngineDisplacement(e.target.value)}
        required
      />

      <select value={brand} onChange={e => setBrand(e.target.value)} required>
        <option value="">Select Brand</option>
        {brands.map(b => (
          <option key={b._id} value={b._id}>{b.name}</option>
        ))}
      </select>

      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
        required
      />

      <button type="submit">Add Product</button>

    </form>
  );
}

export default AddProduct;