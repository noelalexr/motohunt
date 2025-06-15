import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
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
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
                credentials: "include",
            });
            if (response.status === 400) {
                return alert("Invalid Email or Password! Please try again");
            }
            const record = await response.json();
            console.log(record);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center md:p-20 p-5">
            <div className="md:flex w-[80vw] max-w-220">
                <div className="bg-white/60 p-10 md:w-[60%] rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                    <div className="relative">
                        <img src="/images/logo/logo-red.png" alt="motohunt-logo" className="w-75 mx-auto pb-9" />
                        <p className="text-black absolute top-1/2 left-1/2 transform md:-translate-x-[46%] md:-translate-y-[10%] -translate-x-[39%] -translate-y-[20%] font-bold md:text-xs text-[10px] whitespace-nowrap">Ride smarter. Hunt better.</p>
                    </div>
                    <p className="text-center md:text-3xl text-2xl font-bold pb-8">Login to your Account</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="outline-2 outline-white/0 block mx-auto md:w-[65%] py-2 px-3 bg-[#D9F5FF] rounded-full mb-3 text-xs text-gray-500 focus:outline-[#990000] transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="outline-2 outline-white/0 block mx-auto md:w-[65%] py-2 px-3 bg-[#D9F5FF] rounded-full mb-7 text-xs text-gray-500 focus:outline-[#990000] transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <button type="submit" className="bg-[#990000] text-white block w-30 py-2 rounded-full mx-auto text-xs cursor-pointer hover:bg-[#770000] transition-colors duration-300">Login</button>
                        </div>
                    </form>
                </div>
                <div className="relative bg-[#990000] md:w-[40%] px-10 md:py-10 py-15 rounded-b-lg md:rounded-bl-none md:rounded-r-lg text-white flex flex-col justify-center items-center text-center">
                    <p className="md:text-3xl text-2xl pb-8 font-bold">New Here?</p>
                    <p className="text-sm">Sign up or continue as a Guest User and explore the world of motorcycles!</p>
                    <a href="/register" className="bg-white text-black py-2 px-5 rounded-full mt-8 text-xs hover:bg-[#c5f8ff] transition-colors duration-300">Sign Up</a>
                    <p className="mt-1 text-sm">or</p>
                    <a href="/guest-dashboard" className="bg-white text-black py-2 px-5 rounded-full mt-1 text-xs hover:bg-[#c5f8ff] transition-colors duration-300">Continue as Guest User</a>
                    <p className="absolute bottom-3 right-4 text-[9px] text-white/70">Developed by <b>Alexander Noel</b></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
