import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";
import { useNavigate, Link } from "react-router";

function Profile() {
    const navigate = useNavigate()
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handlePhotoClick = () => {
        navigate("/profile/upload-photo");
    };

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
                const profileResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                    method: "GET",
                    credentials: "include",
                });
                const profileData = await profileResponse.json();
                setRecord(profileData);
                const resProducts = await fetch(`${import.meta.env.VITE_API_URL}/api/products/user/${profileData._id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const productsData = await resProducts.json();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
                method: "DELETE",
                credentials: "include",
            });

            setProducts(products.filter((product) => product._id !== productId));
        } catch (err) {
            console.error(err);
            alert("Failed to delete product.");
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return <LoaderPage />;
    }

    return (
        <div>
            <div className="bg-white/10 md:p-10 pb-5">
                <div className="md:w-150 mx-auto">
                    <div className="bg-[#990000b4] px-30 pt-15 pb-35 md:rounded-t-lg">
                        <img src="/images/logo/logo-white.png" alt="" />
                    </div>
                    <div className="relative group">
                        <img
                            src={record.photo.url.replace("/upload/", "/upload/c_fill,w_500,h_500/")}
                            alt="Profile"
                            onClick={handlePhotoClick}
                            className="absolute left-1/2 -translate-x-1/2 md:top-[-120px] top-[-105px] w-[200px] h-[200px] rounded-full cursor-pointer z-1"
                        />
                        <p className="absolute text-white bg-gray-500/90 py-1 px-2 rounded-sm text-xs left-1/2 -translate-x-1/2 md:top-[39px] top-[60px] opacity-0 group-hover:opacity-100 z-2 cursor-pointer transition-all ease-in-out duration-300">Change profile picture</p>
                    </div>
                    <div className="relative bg-white md:rounded-b-lg pb-10">
                        <div onClick={() => navigate("/dashboard")} className="absolute top-3 left-3 rounded-full text-[#990000] p-3 hover:bg-gray-300 active:bg-gray-300 ease-in-out duration-300 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <p className="md:pt-30 pt-35 text-4xl font-bold text-center">{record.name}</p>
                        <p className="text-center">{record.email}</p>
                        <button onClick={handleLogout} className="text-sm border-2 border-[#990000] mt-8 py-2 px-4 block w-30 rounded-full text-[#990000] mx-auto hover:bg-[#990000] hover:text-white active:bg-[#990000] active:text-white transition-colors duration-300 cursor-pointer">Logout</button>
                    </div>
                </div>

                <div className="flex justify-center gap-5 py-10 border-b-2 border-[#990000] md:mx-[3vw] mx-3 text-xs">
                    <div onClick={() => navigate("/add-product")} className="flex gap-2 bg-[#990000] active:bg-[#770000] text-white py-3 px-5 rounded-full cursor-pointer hover:scale-105 ease-in-out duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <button className="cursor-pointer">Post Motorcycle</button>
                    </div>
                    <div onClick={() => navigate("/wishlist")} className="flex gap-2 bg-[#990000] active:bg-[#770000] text-white py-3 px-5 rounded-full cursor-pointer hover:scale-105 ease-in-out duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <button className="cursor-pointer">My Wishlist</button>
                    </div>
                </div>

                <h1 className="text-white text-center text-3xl pt-8 pb-6 font-semibold">Posted Motorcycles</h1>
                {products.length === 0 ? (
                    <p className="text-center text-gray-300 text-lg p-10">You haven't posted any motorcycles yet.</p>
                ) : (
                    <div className="flex flex-wrap justify-center">
                        {products.map(product => (
                            <div className="group flex justify-between bg-white rounded-xl md:m-5 m-3">
                                <Link to={`/products/${product._id}`} key={product._id} className="group-active:bg-gray-200 rounded-l-xl">
                                    <div key={product._id}>
                                        <div className="flex justify-center">
                                            <div className="overflow-hidden rounded-l-lg">
                                                <img
                                                    src={product.image.url.replace("/upload/", "/upload/c_fill,w_500,h_500/")}
                                                    alt={product.name}
                                                    className="md:w-40 w-30 h-40 object-cover rounded-l-lg group-hover:scale-110 group-active:scale-110 ease-in-out duration-300"
                                                />
                                            </div>
                                            <div className="mx-5 my-auto md:w-50 w-30">
                                                <h3 className="md:text-lg text-sm font-semibold pb-2 group-hover:text-[#990000] group-active:text-[#990000] transition-colors duration-300">{product.name}</h3>
                                                <div className="text-xs group-hover:text-[#990000] group-active:text-[#990000] transition-colors duration-300">
                                                    <p>{formatPeso(product.price)}</p>
                                                    <p>{product.brand.name}</p>
                                                    <p>{product.category.name}</p>
                                                    <p>{product.engineDisplacement}cc</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex flex-col justify-center rounded-r-lg py-3 px-5 gap-3 bg-gray-50 group-active:bg-gray-200">
                                    <button onClick={() => navigate(`/edit-product/${product._id}`)} className="text-sm text-white bg-blue-500 px-3 h-9 rounded-lg hover:bg-blue-700 active:bg-blue-700 transition-colors duration-300 cursor-pointer">Edit</button>
                                    <button onClick={() => handleDelete(product._id)} className="text-sm text-white bg-red-500 px-3 h-9 rounded-lg hover:bg-red-700 active:bg-red-700 transition-colors duration-300 cursor-pointer">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {showScrollTop && (
                    <div className="sticky bottom-5 mr-5 flex justify-end">
                        <button
                            onClick={scrollToTop}
                            className="bg-[#990000] text-white p-3 rounded-full shadow-lg hover:bg-[#770000] active:bg-[#770000] transition-all ease-in-out duration-300 z-5 cursor-pointer"
                            title="Back to top"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-[#990009] text-xs text-center py-5 text-white">
                <p>MOTOHUNT | Designed and Developed by <b>Alexander Noel</b></p>
                <p>© 2025 All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Profile;