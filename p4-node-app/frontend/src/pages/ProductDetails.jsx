import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";

const ProductDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductsDetails] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProductsDetails(data);

        //FETCH WISHLIST
        const wishlistResponse = await fetch("http://localhost:3000/api/wishlist", {
          credentials: "include",
        });
        const wishlistData = await wishlistResponse.json();
        const wishlistIds = wishlistData.map(item => item._id);
        setWishlist(wishlistIds);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoaderPage />;
  }

    if (loading) {
        return <LoaderPage />;
    }

    //ADD TO WISHLIST
  const addToWishlist = async (productId) => {
    try {
      await fetch("http://localhost:3000/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      setWishlist(prev => [...prev, productId]);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    }
  };

  //REMOVE FROM WISHLIST
  const removeFromWishlist = async (productId) => {
    try {
      await fetch("http://localhost:3000/api/wishlist/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      setWishlist(prev => prev.filter(id => id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);



    

    return (
        <>
            <img 
                src={productDetails.image.url.replace("/upload/", "/upload/c_fill,ar_16:9,w_1920/")} 
                alt={productDetails.name} 
                style={{ width: "100vw", height: "auto" }}
            />
            <h3>{productDetails.name}</h3>
            <p>{productDetails.description}</p>
            <p>{productDetails.brand.name}</p>
            <p>{productDetails.price}</p>
            <p>{productDetails.category.name}</p>
            <p>{productDetails.engineDisplacement}</p>
            {/* <img src="" alt="" /> */}

            {/* WISHLIST BTN */}
              {isInWishlist(productDetails._id) ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(productDetails._id);
                  }}
                >
                    Remove from Wishlist
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(productDetails._id);
                  }}
                >
                  Add to Wishlist
                </button>
              )}

        </>
        // name: {type: String, required: true, trim: true, },
        //     description: { type: String, required: true, },
        //     price: { type: Number, required: true, },
        //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        //     brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
        //     engineDisplacement: { type: Number, required: true, },
        //     image: { url: { type: String, required: true }, },
        // },
    )
}

export default ProductDetails
