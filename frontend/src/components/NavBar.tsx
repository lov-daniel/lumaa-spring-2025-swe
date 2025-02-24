// Package imports
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuthenticated) {
            logout();
            setTimeout(() => {
                navigate("/");
            }, 100);
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
                        className={`${isAuthenticated ? 'btn btn-md btn-error' : 'btn btn-md btn-success'}`}
                        onClick={handleClick}
                    >
                        {isAuthenticated ? 'Log out' : "Login/Registration"}
                    </a>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default NavBar;
