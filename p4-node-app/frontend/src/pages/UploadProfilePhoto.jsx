import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function UploadProfilePhoto() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                    method: "GET",
                    credentials: "include",
                });
                const profileData = await profileResponse.json();
                setExistingImageUrl(profileData.photo?.url || "");
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("photo", file);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/photo`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            alert("Profile photo updated!");
            navigate("/profile");
        } else {
            setLoading(false);
            alert(data.error || "Upload failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-8">
            <div className="relative bg-white/60 md:py-15 py-10 md:px-20 px-12 rounded-lg">
                <div onClick={() => navigate("/profile")} className="absolute md:top-14 top-19 md:left-5 left-1 rounded-full text-[#990000] p-3 hover:bg-[#990000] hover:text-white ease-in-out duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <h2 className="text-[#990000] text-4xl font-semibold pb-10 text-center">Upload New Profile Photo</h2>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#990000] border-b-white/0 mx-auto mb-4"></div>
                        <p className="font-semibold text-[#990000]">Uploading, please wait...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 text-center">
                        <div className="text-[#990000] text-sm font-semibold" >
                            <p>Existing Image:</p>
                            {existingImageUrl ? <img src={existingImageUrl} alt="Current" width="150" className="mx-auto rounded-lg" /> : <p>No image</p>}
                        </div>
                        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="mx-auto w-[100%] py-2 px-3 bg-gray-500 rounded-md text-sm text-gray-100 hover:bg-gray-600 transition-colors duration-300 cursor-pointer" />
                        <button type="submit" className="bg-[#990000] text-white block w-30 py-2 rounded-full mt-10 mx-auto text-xs cursor-pointer hover:bg-[#770000] transition-colors duration-300">Upload</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default UploadProfilePhoto;