import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function LoginPage() {
    const [activeTab, setActive] = useState("login");
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const auth = useAuth();
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let response;

            if (activeTab === "login") {
                console.log("Logging in with:", formData);
                response = await axios.post(`${BACKEND_URL}/auth/login`, {
                    username: formData.username,
                    password: formData.password
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                response = await axios.post(`${BACKEND_URL}/auth/register`, {
                    username: formData.username,
                    password: formData.password
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }

            const token = response.data.token;
            const userID = response.data.user.userID;
            console.log(`Logging in UserID: ${userID}`);
            localStorage.setItem("token", token); // Store token in localStorage
            localStorage.setItem('userID', userID);

            // Now login and navigate to the task page
            auth.login(userID); // Pass token to context login
            navigate("/tasks"); // Use navigate to go to the tasks page

        } catch (error) {
            setError("An error occurred during login/registration.");
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="flex justify-center w-full">
                <div role="tablist" className="tabs tabs-lifted tabs-lg">
                    <a
                        role="tab"
                        className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
                        onClick={() => setActive("login")}
                    >
                        Login
                    </a>
                    <a
                        role="tab"
                        className={`tab ${activeTab === "register" ? "tab-active" : ""}`}
                        onClick={() => setActive("register")}
                    >
                        Register
                    </a>
                </div>
            </div>

            <div className="p-6 border rounded-lg mt-6 w-96 shadow-lg">
                <h2 className="text-xl font-semibold text-center mb-4">
                    {activeTab === "login" ? "Login" : "Register"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {activeTab === "login" ? "Login" : "Register"}
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
