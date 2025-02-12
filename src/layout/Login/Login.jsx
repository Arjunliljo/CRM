import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectAuth } from '../../../global/authSlice';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state)=> state.auth);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      if (result) {
        navigate('/dashboard'); 
      }
    } catch (err) {
      console.log('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="user-box">
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}