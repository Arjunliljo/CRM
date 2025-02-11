// // export default function Login() {

// //   const handleSubmit = ()=>{

// //   }

// //   return (
// //     <div className="login-page">
// //       <div className="login-box">
// //         <h2>Login</h2>
// //         <form>
// //           <div className="user-box">
// //             <input type="text" />
// //             <label>Email</label>
// //           </div>
// //           <div className="user-box">
// //             <input type="password" />
// //             <label>Password</label>
// //           </div>
// //           <a href="#">
// //             <span />
// //             <span />
// //             <span />
// //             <span />
// //             Login
// //           </a>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser, clearError, selectAuthError, selectAuthLoading } from '../../../global/authSlice';

// export default function Login() {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const error = useSelector(selectAuthError);
//   const loading = useSelector(selectAuthLoading);

//   // Clear any existing errors when component mounts
//   // useEffect(() => {
//   //   dispatch(clearError());
//   // }, [dispatch]);

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(loginUser(credentials)).unwrap();
//       if (result) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       // Error is handled by the slice, no need for additional handling here
//       console.error('Login failed:', err);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           {/* {error && (
//             <div className="error-message bg-red-100 text-red-600 p-2 mb-4 rounded">
//               {error}
//             </div>
//           )} */}
//           <div className="user-box">
//             <input
//               type="text"
//               name="email"
//               value={credentials.email}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//             <label>Email</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//             <label>Password</label>
//           </div>
//           <button 
//             type="submit" 
//             disabled={loading}
//             className={`w-full p-2 rounded ${
//               loading 
//                 ? 'bg-gray-300 cursor-not-allowed' 
//                 : 'bg-blue-500 hover:bg-blue-600 text-white'
//             }`}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


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