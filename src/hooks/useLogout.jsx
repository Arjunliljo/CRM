import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../global/authSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        setTimeout(() => {
            navigate("/login");
        }, 100)
    };

    return handleLogout;
};

export default useLogout;
