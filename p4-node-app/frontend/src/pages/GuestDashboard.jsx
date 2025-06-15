import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";

const GuestDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    const formatPeso = (price) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

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
            <div className="flex justify-between md:py-4 md:px-[10vw] p-3 bg-[#990000]">
                <img src="/images/logo/logo-white.png" alt="motohunt-logo" className="md:h-[30px] h-[20px] my-auto" />
            </div>
            <div className="md:flex justify-center gap-2 bg-black/80 text-center text-white text-sm py-2">
                <p>Please login to access the full features of the app.</p><a href="/login" className="text-blue-500 underline hover:text-blue-400">Back to login</a>
            </div>
            <div className="bg-gray-100/75 py-3">
                <div className="relative flex gap-3 justify-center items-center md:w-[75vw] md:mx-auto bg-white rounded-full py-2 px-5 mx-2 border-2 border-white focus-within:bg-[#ffefef] focus-within:border-[#990000] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-[100%] outline-none"
                    />
                    <button
                        onClick={handleRemoveFilter}
                        className={`absolute right-1 top-1 text-white rounded-full p-[6px] bg-[#990000] cursor-pointer hover:scale-110 ease-in-out duration-300
                            ${search ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="bg-white/10 pb-12 pt-10 md:px-[10vw] min-h-[100vh]">
                <div className="flex gap-2 justify-center pb-4">
                    <div className="bg-[#990000] md:w-[35%] w-[20%] h-[2px] rounded-full my-auto"></div>
                    <p className="text-[#990000] font-bold">Motohunt Dashboard</p>
                    <div className="bg-[#990000] md:w-[35%] w-[20%] h-[2px] rounded-full my-auto"></div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {filtered.map((product) => (
                        <div key={product._id} onClick={() => alert("Please login!")} className="m-5 group cursor-pointer">
                            <div className="overflow-hidden rounded-t-lg bg-black">
                                <img
                                    src={product.image.url.replace("/upload/", "/upload/c_fill,w_500,h_281/")}
                                    alt={product.name}
                                    className="md:w-[350px] md:h-[197px] object-cover rounded-t-lg group-hover:scale-110 ease-in-out duration-300"
                                />
                            </div>
                            <div className="bg-white p-4 rounded-b-lg z-1 group-hover:bg-[#990000] transition-colors duration-300">
                                <h3 className="text-lg font-bold group-hover:text-white">{product.name}</h3>
                                <p className="text-sm group-hover:text-white">{formatPeso(product.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#990009] text-xs text-center py-5 text-white">
                <p>MOTOHUNT | Designed and Developed by <b>Alaxander Noel</b></p>
                <p>© 2025 All Rights Reserved</p>
            </div>
        </div>
    );

};

export default GuestDashboard;