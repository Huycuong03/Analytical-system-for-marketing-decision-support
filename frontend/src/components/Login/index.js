import "./index.css";
import { useRef, useState } from "react";
import axios from "axios";

function Login({ setUser, navigate }) {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState("");

  async function handleLogin() {
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        JSON.stringify(credentials),
        {
          headers: {
            "content-type": "application/json",
          }
        }
      );

      if (res.status === 200) {
        document.cookie = `token=${res.data.token}; path=/api; domain=localhost`
        setUser(true);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div id="login-page">
        <div id="login-div">
            <em>{error}</em>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" ref={username}/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={password} />
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  );
}

export default Login;