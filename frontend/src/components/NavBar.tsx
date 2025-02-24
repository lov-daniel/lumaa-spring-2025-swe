import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const auth = useAuth();
    const navigate = useNavigate(); // Initialize navigate

    const handleClick = () => {
        console.log("Button clicked, isAuthenticated: ", auth.isAuthenticated);

        if (auth.isAuthenticated) {
            auth.logout();
            // Ensuring the logout has updated before navigating
            setTimeout(() => {
                navigate("/");
            }, 100); // Wait for logout to be effective
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <div className="navbar bg-base-200 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Task Manager</a>
                </div>
                <div className="navbar-end">
                    <a
                        className={`${auth.isAuthenticated ? 'btn btn-md btn-error' : 'btn btn-md btn-success'}`}
                        onClick={handleClick}
                    >
                        {auth.isAuthenticated ? 'Log out' : "Login/Registration"}
                    </a>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default NavBar;
