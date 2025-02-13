import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../global/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated, "sut");

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};
