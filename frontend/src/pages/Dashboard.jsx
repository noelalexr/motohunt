import { useNavigate, Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import LoaderPage from "./LoaderPage";




const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const brandScrollRef = useRef(null);
    const categoryScrollRef = useRef(null);
    const [isBrandOverflowing, setIsBrandOverflowing] = useState(false);
    const [isCategoryOverflowing, setIsCategoryOverflowing] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const formatPeso = (price) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const profileResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                    method: "GET",
                    credentials: "include",
                });
                const profileData = await profileResponse.json();
                setUser(profileData);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();
                for (let i = data.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [data[i], data[j]] = [data[j], data[i]];
                }
                setProducts(data);
                setFiltered(data);

                const brandSet = new Set();
                const categorySet = new Set();

                data.forEach(product => {
                    if (product.brand?._id) {
                        brandSet.add(JSON.stringify(product.brand));
                    }
                    if (product.category?.name) {
                        categorySet.add(JSON.stringify(product.category));
                    }
                });

                setBrands(Array.from(brandSet).map(item => JSON.parse(item)));
                setCategories(Array.from(categorySet).map(item => JSON.parse(item)));

                console.log(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const checkBrandOverflow = () => {
            if (brandScrollRef.current) {
                setIsBrandOverflowing(
                    brandScrollRef.current.scrollWidth > brandScrollRef.current.clientWidth
                );
            }
        };

        const checkCategoryOverflow = () => {
            if (categoryScrollRef.current) {
                setIsCategoryOverflowing(
                    categoryScrollRef.current.scrollWidth > categoryScrollRef.current.clientWidth
                );
            }
        };

        checkBrandOverflow();
        checkCategoryOverflow();
        window.addEventListener("resize", () => {
            checkBrandOverflow();
            checkCategoryOverflow();
        });

        return () => window.removeEventListener("resize", () => { });
    }, [brands, categories]);

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

    useEffect(() => {
        applyFilters(search, selectedBrand, selectedCategory);
    }, [search, selectedBrand, selectedCategory, products]);

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

    const scrollLeft = (ref) => {
        ref.current.scrollLeft -= 150;
    };

    const scrollRight = (ref) => {
        ref.current.scrollLeft += 150;
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
            <div className="bg-gray-100/75 pb-4">
                <div className="flex justify-between md:py-4 md:px-[10vw] p-3 bg-[#990000]">
                    <img src="/images/logo/logo-white.png" alt="motohunt-logo" className="md:h-[30px] h-[20px] my-auto" />
                    <img
                        src={user.photo.url.replace("/upload/", "/upload/c_fill,w_150,h_150/")}
                        alt="Profile"
                        onClick={() => navigate("/profile")}
                        className="md:h-[45px] h-[35px] rounded-full cursor-pointer border-2 border-white"
                    />
                </div>
                <div className="relative flex gap-3 justify-center items-center md:w-[75vw] md:mx-auto bg-white rounded-full py-2 px-5 mb-3 mt-4 mx-2 border-2 border-white focus-within:bg-[#ffefef] focus-within:border-[#990000] transition-colors duration-300">
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
                            ${search ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className=" bg-gray-500/40 py-2 md:px-[12vw] mb-3 text-center">
                    <p className="text-[#990000] font-semibold">Filter by Brand:</p>
                    <div className="flex justify-center">
                        <div className="relative overflow-hidden">
                            {isBrandOverflowing && (
                                <button onClick={() => scrollLeft(brandScrollRef)} className="text-white bg-[#990000b9] absolute left-0 top-[23px] w-9 h-9 rounded-full text-lg hover:bg-[#990000] active:bg-[#990000] z-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            )}
                            <div
                                ref={brandScrollRef}
                                className="flex overflow-x-auto scroll-smooth"
                            >
                                {brands.map((brand) => (
                                    <button
                                        key={brand._id}
                                        onClick={() => handleBrandClick(brand.name)}
                                        className={`outline-5 flex-none rounded-xl md:mx-2 mx-[5px] my-2 bg-white w-20 h-20 cursor-pointer duration-300 ease-in-out hover:scale-105
                                            ${selectedBrand === brand.name ? "outline-[#990000]" : "outline-white/0"}`}
                                    >
                                        <img
                                            src={brand.logo?.url.replace("/upload/", "/upload/w_500,/")}
                                            alt={brand.name}
                                            className="w-[50px] mx-auto"
                                        />
                                    </button>
                                ))}
                            </div>
                            {isBrandOverflowing && (
                                <button onClick={() => scrollRight(brandScrollRef)} className="text-white bg-[#990000b9] absolute right-0 top-[23px] w-9 h-9 rounded-full text-lg hover:bg-[#990000] active:bg-[#990000] z-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-500/40 py-2 md:px-[12vw] text-center">
                    <p className="text-[#990000] font-semibold">Filter by Category:</p>
                    <div className="flex justify-center">
                        <div className="relative overflow-hidden">
                            {isCategoryOverflowing && (
                                <button onClick={() => scrollLeft(categoryScrollRef)} className="text-white bg-[#990000b9] absolute left-0 top-[23px] w-9 h-9 rounded-full text-lg hover:bg-[#990000] active:bg-[#990000] z-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            )}
                            <div
                                ref={categoryScrollRef}
                                className="flex overflow-x-auto scroll-smooth"
                            >
                                {categories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() => handleCategoryClick(category.name)}
                                        className={`outline-5 flex flex-col justify-end pb-1 rounded-xl md:mx-2 mx-[5px] my-2 bg-white w-25 h-18 shrink-0 cursor-pointer duration-300 ease-in-out hover:scale-105
                                            ${selectedCategory === category.name ? "outline-[#990000]" : "outline-white/0"}`}
                                    >
                                        <img
                                            src={category.image?.url.replace("/upload/", "/upload/w_500,/")}
                                            alt={category.name}
                                            className="w-[55px] mx-auto"
                                        />
                                        <p className="text-xs font-semibold">{category.name}</p>
                                    </button>
                                ))}
                            </div>
                            {isCategoryOverflowing && (
                                <button onClick={() => scrollRight(categoryScrollRef)} className="text-white bg-[#990000b9] absolute right-0 top-[23px] w-9 h-9 rounded-full text-lg hover:bg-[#990000] active:bg-[#990000] z-1 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white/10 pb-5 md:px-[10vw] min-h-[100vh]">
                <button
                    onClick={handleRemoveFilter}
                    className={`block md:text-sm text-xs text-white font-semibold md:py-1 py-2 rounded-b-xl px-4 mx-auto bg-[#990000] cursor-pointer hover:bg-[#770000] active:bg-[#770000] transition-all ease-in-out duration-300
                        ${selectedBrand || selectedCategory ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                    Clear Filters
                </button>
                <div className="flex gap-2 justify-center py-4">
                    <div className="bg-[#990000] md:w-[35%] w-[20%] h-[2px] rounded-full my-auto"></div>
                    <p className="text-[#990000] font-bold">Motohunt Dashboard</p>
                    <div className="bg-[#990000] md:w-[35%] w-[20%] h-[2px] rounded-full my-auto"></div>
                </div>
                <div className="flex flex-wrap justify-center ">
                    {filtered.map((product) => (
                        <Link
                            to={`/products/${product._id}`}
                            key={product._id}
                            className="m-5"
                        >
                            <div className="group">
                                <div className="overflow-hidden rounded-t-lg bg-black">
                                    <img
                                        src={product.image.url.replace("/upload/", "/upload/c_fill,w_1000,h_563/")}
                                        alt={product.name}
                                        className="md:w-[350px] md:h-[197px] object-cover rounded-t-lg group-hover:scale-110 group-active:scale-110 ease-in-out duration-300"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-b-lg z-1 group-hover:bg-[#990000] group-active:bg-[#990000] transition-colors duration-300">
                                    <h3 className="text-lg font-bold group-hover:text-white group-active:text-white">{product.name}</h3>
                                    <p className="text-sm group-hover:text-white group-active:text-white">{formatPeso(product.price)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
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
        </div >
    )
}

export default Dashboard
