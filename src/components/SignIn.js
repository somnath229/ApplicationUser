import React, { useState } from "react";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://authenticationuser-nf9c.onrender.com/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      history("/"); // Redirect to home page
    } else {
      console.log("Token or first name not found in response:", json);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-5"> SignIn to access Application</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text ms-2">
            *We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
            required
          />
          <div id="passwordHelp" className="form-text ms-2">
            *Password must contain a Number, Uppercase, Lowercase and special
            some Characters.
          </div>
        </div>
        <button type="submit" className="btn btn-primary ms-3">
          Sign in
        </button>
        <div id="passwordHelp" className="form-text ms-2">
          *Due to free server it might be slow sometimes. You can check signin :
          username : test05@gmail.com , password : test05@gmail.com .
        </div>
      </form>
    </div>
  );
};

export default SignIn;
