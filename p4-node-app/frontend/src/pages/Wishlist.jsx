import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";
import { useNavigate, Link } from "react-router";

function Wishlist() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);

    const formatPeso = (price) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wishlistResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
                    credentials: "include",
                });
                const wishlistData = await wishlistResponse.json();
                setWishlist(wishlistData);

            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    if (loading) {
        return <LoaderPage />;
    }

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
                                    className="absolute p-1 rounded-full text-[#990000] border-2 border-[#990000] right-2 top-2 hover:bg-[#990000] hover:text-white transition-colors duration-300 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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