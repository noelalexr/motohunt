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
    const [user, setUser] = useState("");
    const [image, setImage] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resBrands = await fetch(`${import.meta.env.VITE_API_URL}/api/brands`, {
                method: "GET",
                credentials: "include",
            });
            const resCategories = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
                method: "GET",
                credentials: "include",
            });
            const resUser = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                method: "GET",
                credentials: "include",
            });

            const brandsData = await resBrands.json();
            const categoriesData = await resCategories.json();
            const userData = await resUser.json();

            setBrands(brandsData);
            setCategories(categoriesData);
            setUser(userData._id);

        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("engineDisplacement", engineDisplacement);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("user", user);
        formData.append("image", image);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();
            console.log("Product created:", data);
            alert("Motorcycle posted!");
            navigate("/profile")
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert("Failed to post");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-8">
            <div className="relative bg-white/60 rounded-lg md:py-15 py-10 md:px-20 px-12">
                <div onClick={() => navigate("/profile")} className="absolute top-14 md:left-6 left-4 rounded-full text-[#990000] p-3 hover:bg-[#990000] hover:text-white ease-in-out duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <p className="text-[#990000] text-4xl font-semibold pb-10 text-center">Post a Motorcycle</p>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#990000] border-b-white/0 mx-auto mb-4"></div>
                        <p className="font-semibold text-[#990000]">Posting, please wait...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 text-center">
                        <input
                            type="text"
                            maxLength={32}
                            placeholder="Motorcycle Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] h-30 py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <input
                            type="number"
                            placeholder="Engine Displacement"
                            value={engineDisplacement}
                            onChange={e => setEngineDisplacement(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <select value={brand} onChange={e => setBrand(e.target.value)} className="mx-auto w-[70%] py-2 px-3 bg-[#990000] rounded-md text-sm text-white transition-colors duration-300 cursor-pointer hover:bg-[#770000]" required>
                            <option value="">Select Brand</option>
                            {brands.map(b => (
                                <option key={b._id} value={b._id}>{b.name}</option>
                            ))}
                        </select>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="mx-auto w-[70%] py-2 px-3 bg-[#990000] rounded-md text-sm text-white transition-colors duration-300 cursor-pointer hover:bg-[#770000]" required>
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <div>
                            <p className="text-[#990000] text-sm font-semibold">Upload an image of your motorcycle</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setImage(e.target.files[0])}
                                required
                                className="w-[90%] py-2 px-3 bg-gray-500 rounded-md text-sm text-gray-100 hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
                            />
                        </div>
                        <button type="submit" className="bg-[#990000] text-white block w-45 py-4 rounded-full mt-10 mx-auto text-md cursor-pointer hover:bg-[#770000] transition-colors duration-300">Add Product</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddProduct;