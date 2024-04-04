import React, { useState } from "react";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    avatar: "",
    domain: "",
    available: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      avatar,
      domain,
      available,
    } = credentials;
    const response = await fetch(
      "https://authenticationuser-nf9c.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          gender,
          avatar,
          domain,
          available,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      //  Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      history("/");
    } else {
      console.log("Token or first name not found in response:", json);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> Register to access Application</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            first_name
          </label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            id="first_name"
            aria-describedby="first_name"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            last_name
          </label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            id="last_name"
            aria-describedby="last_name"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
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
            id="password"
            onChange={onChange}
            minLength={6}
            required
          />
          <div id="passwordHelp" className="form-text ms-2">
            *Password must contain a Number, Uppercase, Lowercase and special
            some Characters.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
        </div>
        {/* Avatar */}
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Avatar
          </label>
          <input
            type="text"
            className="form-control"
            name="avatar"
            id="avatar"
            onChange={onChange}
          />
        </div>
        {/* Domain */}
        <div className="mb-3">
          <label htmlFor="domain" className="form-label">
            Domain
          </label>
          <input
            type="text"
            className="form-control"
            name="domain"
            id="domain"
            onChange={onChange}
          />
        </div>
        {/* Available */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="available"
            name="available"
            value="true"
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="available">
            Available
          </label>
        </div>
        <button type="submit" className="btn btn-primary ms-3">
          Sign up
        </button>
        <div id="passwordHelp" className="form-text my-5 mx-3">
          *Due to free server it might be slow sometimes. You can check signin
           : username : test05@gmail.com , password : test05@gmail.com .
        </div>
      </form>
    </div>
  );
};
