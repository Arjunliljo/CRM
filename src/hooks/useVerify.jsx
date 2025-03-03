import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../global/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, allowedTabsStr } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${allowedTabsStr[0]}`);
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};
