import React, { useState } from "react";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser, {  error }] = useSignupUserMutation();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    signupUser({ name, email, password, picture: "" }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/chat");
      }
    });
  }

  return (
    <>
      <form
        style={{ width: "80%", maxWidth: 500, padding: "100px" }}
        onSubmit={handleSignup}
      >
        <h1 className="text-center">Create account</h1>
        {error && <p className="alert alert-danger">{error.data}</p>}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button variant="primary" type="submit">
           Signup
        </button>
        <div className="py-4">
          <p className="text-center">
            Already have an account ? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Signup;
