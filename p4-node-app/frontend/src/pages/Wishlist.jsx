import React, { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";
import { useNavigate, Link } from "react-router";

function Wishlist() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    const formatPeso = (price) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                //FETCH WISHLIST DATYA
                const wishlistResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
                    credentials: "include",
                });
                const wishlistData = await wishlistResponse.json();
                setWishlist(wishlistData);
                // const wishlistIds = wishlistData.map(item => item._id);
                // setWishlist(wishlistIds);

            } catch (error) {
                console.error("Error fetching wishlist:", error);
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
            await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/remove`, {
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
        <div className="relative bg-white/10 min-h-screen">
            <h1 className="text-white text-center text-3xl pt-8 pb-6 font-semibold">My Wishlist</h1>
            <div onClick={() => navigate("/profile")} className="absolute left-3 top-7 md:left-[32vw] rounded-full text-white p-3 bg-[#990000] hover:scale-110 ease-in-out duration-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </div>
            {wishlist.length === 0 ? (
                <p className="text-center text-gray-300 text-lg pt-[35vh]">No motorcycles in your wishlist.</p>
            ) : (
                <div className="flex flex-wrap justify-center md:px-[15vw]">
                    {wishlist.map((product) => (
                        <Link to={`/products/${product._id}`} key={product._id}>
                            <div className="relative md:m-5 m-3 flex group">
                                <div className="overflow-hidden rounded-l-lg">
                                    <img
                                        src={product.image.url.replace("/upload/", "/upload/c_fill,w_500,h_500/")}
                                        alt={product.name}
                                        className="md:w-[150px] w-[130px] h-[150px] object-cover group-hover:scale-110 ease-in-out duration-300"
                                    />
                                </div>
                                <div className="bg-white flex flex-col justify-center w-85 pr-10 pl-5 rounded-r-lg group-hover:text-[#990000]">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-md">{formatPeso(product.price)}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWishlist(product._id);
                                    }}
                                    className="absolute p-2 rounded-full text-[#990000] right-0 top-0 hover:scale-110 ease-in-out duration-300 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;