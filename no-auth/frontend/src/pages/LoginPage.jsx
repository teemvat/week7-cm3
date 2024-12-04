import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        navigate("/");
    };
    return (

        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={submitForm}>

                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Login</button>
            </form>
            <div className="signup-redirect">
                <p>New in here? Sign up to be a user</p>
                <button onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
        </div>
    );
};

export default LoginPage;