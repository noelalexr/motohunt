import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            });

            const record = await response.json();

            navigate("/login");

            console.log(record);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={form.name}
                    onChange={handleChange}

                />
            </div>

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
                <button type='submit'>Register</button>
            </div>
        </form>
    </>
  )
}

export default Register;
