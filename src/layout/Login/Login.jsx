import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, selectAuth } from "../../../global/authSlice";
import Logo from "./../../assets/Icons/mlq-01pro.svg";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      if (result) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img src={Logo} alt="logo" style={{ height: "50px", width: "50px" }} />
        <h2>Welcome Back</h2>
        <p className="login-description">
          Please enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="user-box">
            <input
              type="text"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" disabled={loading} className="login-box-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
