import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductsDetails] = useState([]);
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setProductsDetails(data);

                //FETCH WISHLIST
                const wishlistResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
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

    const addToWishlist = async (productId) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/add`, {
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

    const removeFromWishlist = async (productId) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/remove`, {
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

    console.log(productDetails)

    return (
        <div className="md:p-10 bg-white/10 min-h-screen flex flex-col justify-center">
            <div className="md:flex justify-center">
                <div className="relative overflow-hidden md:rounded-l-lg bg-black">
                    <img
                        src={productDetails.image.url.replace("/upload/", "/upload/c_fill,ar_4:3,w_1500/")}
                        alt={productDetails.name}
                        className="w-190 hover:scale-110 ease-in-out duration-300"
                    />
                    <div onClick={() => navigate(-1)} className="absolute top-5 left-5 bg-[#990000] rounded-full text-white p-3 hover:scale-110 ease-in-out duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                </div>
                <div className="bg-white p-10 flex flex-col justify-center md:rounded-r-lg">
                    <h3 className="md:text-4xl text-2xl font-bold text-[#990000] text-center">{productDetails.name}</h3>
                    {isInWishlist(productDetails._id) ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeFromWishlist(productDetails._id);
                            }}
                            className="text-xs font-semibold border-2 text-white bg-red-500 border-red-500 w-50 py-1 px-2 rounded-2xl mx-auto mt-5 cursor-pointer flex gap-1 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <p className="m-auto">Remove from Wishlist</p>
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToWishlist(productDetails._id);
                            }}
                            className="text-xs font-semibold border-2 text-red-500 border-red-500 w-50 py-1 px-2 rounded-2xl mx-auto mt-5 cursor-pointer flex transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <p className="m-auto">Add to Wishlist</p>
                        </button>
                    )}
                    <div className="pt-10 md:hidden">
                        <p className="font-bold">Description:</p>
                        <p className="px-5 py-1">{productDetails.description}</p>
                    </div>
                    <div className="md:px-15 rounded-lg my-10 md:text-lg pb-5">
                        <p><b>Brand: </b>{productDetails.brand.name}</p>
                        <p><b>Price: </b>{formatPeso(productDetails.price)}</p>
                        <p><b>Category: </b>{productDetails.category.name}</p>
                        <p><b>Engince Displacement: </b>{productDetails.engineDisplacement}cc</p>
                    </div>

                    <p className="font-bold text-sm text-[#990000] pb-2">Posted by:</p>
                    <div className="bg-gray-200 p-2 mx-5 rounded-full text-xs text-gray-600">
                        <div className="flex gap-3">
                            <img
                                src={productDetails.user.photo.url.replace("/upload/", "/upload/c_fill,w_50,h_50/")}
                                alt="User"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold text-[12px]">{productDetails.user.name}</p>
                                <p className="font-semibold text-gray-400">{new Date(productDetails.createdAt).toLocaleString('en-PH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white px-6 py-4 max-w-[50vw] mx-auto my-5 rounded-lg text-sm md:block hidden">
                <p className="font-bold">Description:</p>
                <p className="px-5 py-1">{productDetails.description}</p>
            </div>
        </div>
    )
}

export default ProductDetails
