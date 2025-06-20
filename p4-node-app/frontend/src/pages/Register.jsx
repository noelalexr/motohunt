import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                if (response.status === 500) {
                    const errorData = await response.json();
                    setLoading(false);
                    return alert(errorData.message || "Email already exists.");
                }
            }

            alert("Registered Successfully!")
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center text-center p-10">
            <div className="bg-white/60 md:py-12 md:px-15 p-10 max-w-120 rounded-lg">
                <div className="relative">
                    <img src="/images/logo/logo-red.png" alt="motohunt-logo" className="w-75 mx-auto pb-9" />
                    <p className="text-black absolute top-1/2 left-1/2 transform md:-translate-x-[46%] md:-translate-y-[10%] -translate-x-[39%] -translate-y-[20%] font-bold md:text-xs text-[10px] whitespace-nowrap">Ride smarter. Hunt better.</p>
                </div>
                <h2 className="text-center md:text-3xl text-2xl font-bold pb-8">Sign Up</h2>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#990000] border-b-white/0 mx-auto mb-4"></div>
                        <p className="font-semibold text-[#990000]">Registering, please wait...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="outline-2 outline-white/0 w-[100%] block mx-auto py-2 px-3 bg-[#D9F5FF] rounded-full mb-3 text-xs focus:outline-[#990000] transition-colors duration-300"
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="outline-2 outline-white/0 w-[100%] block mx-auto py-2 px-3 bg-[#D9F5FF] rounded-full mb-3 text-xs focus:outline-[#990000] transition-colors duration-300"
                        />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="outline-2 outline-white/0 w-[100%] block mx-auto py-2 px-3 bg-[#D9F5FF] rounded-full mb-5 text-xs focus:outline-[#990000] transition-colors duration-300"
                        />
                        <button type="submit" className="bg-[#990000] text-white block w-30 py-2 rounded-full mx-auto text-xs cursor-pointer hover:bg-[#770000] active:bg-[#770000] transition-colors duration-300">Register</button>
                        <div className="mt-5 gap-1">
                            <p className="text-sm">Already have an account?</p>
                            <a href="/Login" className="text-sm text-[#990000] font-semibold underline hover:text-[#770000] active:text-[#770000] transition-colors duration-300">Login</a>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Register;
