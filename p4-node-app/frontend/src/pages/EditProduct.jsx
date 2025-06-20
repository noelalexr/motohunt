import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [engineDisplacement, setEngineDisplacement] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resProduct = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const resBrands = await fetch(`${import.meta.env.VITE_API_URL}/api/brands`, {
                    method: "GET",
                    credentials: "include",
                });
                const resCategories = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
                    method: "GET",
                    credentials: "include",
                });

                const productData = await resProduct.json();
                const brandsData = await resBrands.json();
                const categoriesData = await resCategories.json();

                setName(productData.name);
                setDescription(productData.description);
                setPrice(productData.price);
                setEngineDisplacement(productData.engineDisplacement);
                setBrand(productData.brand?._id || productData.brand);
                setCategory(productData.category?._id || productData.category);
                setExistingImageUrl(productData.image?.url || "");
                setBrands(brandsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error("Failed to load data:", err);
                alert("Failed to load product data.");
            }
        };

        fetchData();
    }, [id]);

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

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                method: "PATCH",
                credentials: "include",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to update product");
            }

            const data = await res.json();
            console.log("Motorcycle updated:", data);
            alert("Motorcycle successfully updated!");
            navigate("/profile");
        } catch (err) {
            setLoading(false);
            console.error(err);
            alert("Failed to update motorcycle");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-8">
            <div className="relative bg-white/60 rounded-lg md:py-15 py-10 md:px-20 px-12">
                <div onClick={() => navigate("/profile")} className="absolute top-14 md:left-6 left-4 rounded-full text-[#990000] p-3 hover:bg-[#990000] active:bg-[#990000] hover:text-white active:text-white ease-in-out duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <p className="text-[#990000] text-4xl font-semibold pb-10 text-center">Update Motorcycle</p>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#990000] border-b-white/0 mx-auto mb-4"></div>
                        <p className="font-semibold text-[#990000]">Updating, please wait...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 text-center">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] h-30 py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <input
                            type="number"
                            placeholder="Engine Displacement"
                            value={engineDisplacement}
                            onChange={(e) => setEngineDisplacement(e.target.value)}
                            required
                            className="outline-2 outline-white/0 w-[100%] py-2 px-3 bg-white rounded-md text-sm text-gray-600 focus:outline-[#990000] transition-colors duration-300"
                        />
                        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="mx-auto w-[70%] py-2 px-3 bg-[#990000] rounded-md text-sm text-white transition-colors duration-300 cursor-pointer hover:bg-[#770000] active:bg-[#770000]" required>
                            <option value="">Select Brand</option>
                            {brands.map((b) => (
                                <option key={b._id} value={b._id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mx-auto w-[70%] py-2 px-3 bg-[#990000] rounded-md text-sm text-white transition-colors duration-300 cursor-pointer hover:bg-[#770000] active:bg-[#770000]" required>
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <div className="bg-white/30 rounded-lg p-3">
                            <div className="text-[#990000] text-sm font-semibold" >
                                <p>Existing Image:</p>
                                {existingImageUrl ? <img src={existingImageUrl} alt="Current" width="150" className="mx-auto rounded-lg" /> : <p>No image</p>}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-[100%] py-2 px-3 bg-gray-500 rounded-md text-sm text-gray-100 hover:bg-gray-600 active:bg-gray-600 transition-colors duration-300 cursor-pointer mx-auto mt-3"
                            />
                        </div>
                        <button type="submit" className="bg-[#990000] text-white block w-50 py-4 rounded-full mt-10 mx-auto text-md cursor-pointer hover:bg-[#770000] active:bg-[#770000] transition-colors duration-300">Update Product</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EditProduct;