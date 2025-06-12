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

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
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
            alert("aaa")
            console.error(error);
        }
    }

  return (
    <>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={form.email}
                    onChange={handleChange}

                />
            </div>

            <div>
                <label htmlFor="">Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <br />
            <br />

            <div>
                <button type="submit">Login</button>
            </div>
            <div>
                <a href="/register">Register</a>
                <br />
                <a href="/guest-dashboard">Continue at Guest User</a>
            </div>
        </form>
    </>
  )
}

export default Login;
