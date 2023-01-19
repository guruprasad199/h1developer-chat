import React, { useContext, useState } from "react";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser] = useLoginUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password }).then(({ data }) => {
        if (data) {
          socket.emit("new-user");
          navigate("/chat");
        }
      });
  }

  return (
    <>
      <form
        style={{ width: "80%", maxWidth: 500, padding: "100px" }}
        onSubmit={handleLogin}
      >
        <div style={{ marginBottom: "20px" }}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button style={{ background: "blue", color: "white" }} type="submit">
          Login
        </button>
        <div className="py-4">
          <p className="text-center">
            Don't have an account ? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
