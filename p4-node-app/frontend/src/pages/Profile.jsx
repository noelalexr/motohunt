import React, { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";
import { useNavigate, Link } from "react-router";

function Profile() {
  const navigate = useNavigate()
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const handlePhotoClick = () => {
    navigate("/profile/upload-photo");
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      //FETCH PROFILE DATA
      const profileResponse = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include",
      });
      const profileData = await profileResponse.json();
      setRecord(profileData);

      //FETCH WISHLIST DATYA
      const wishlistResponse = await fetch("http://localhost:3000/api/wishlist", {
        credentials: "include",
      });
      const wishlistData = await wishlistResponse.json();
      setWishlist(wishlistData);
      // const wishlistIds = wishlistData.map(item => item._id);
      // setWishlist(wishlistIds);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return <LoaderPage />;
  }

  //REMOVE FROM WISHLIST
  const removeFromWishlist = async (productId) => {
  try {
    await fetch("http://localhost:3000/api/wishlist/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    setWishlist(prev => prev.filter(product => product._id !== productId));
  } catch (err) {
    console.error("Failed to remove from wishlist:", err);
  }
};

  // console.log(record)

  return (
    <div>
      <h2>Profile</h2>
        <div>
          <img
            src={record.photo.url.replace("/upload/", "/upload/c_fill,w_200,h_200/")}
            alt="Profile"
            onClick={handlePhotoClick}
            style={{ width: "200px", height: "200px", borderRadius: "50%", cursor: "pointer" }}
          />
          <h3>User Details:</h3>
          {/* <p><strong>ID:</strong> {record._id}</p> */}
          <p><strong>Name:</strong> {record.name}</p>
          <p><strong>Email:</strong> {record.email}</p>
        </div>

        <button onClick={() => navigate("/add-product")}>Add product</button>

        {wishlist.length === 0 ? (
        <p>No products in your wishlist.</p>
      ) : (
        wishlist.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div>
              <img 
                src={product.image.url.replace("/upload/", "/upload/c_fill,w_200,h_112/")} 
                alt={product.name} 
                style={{ width: "200px", height: "112px", objectFit: "cover" }}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(product._id);
                }}
              >
                Remove from Wishlist
              </button>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Profile;