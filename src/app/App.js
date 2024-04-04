import React, { useState } from "react";
import UserCard from "../components/UserCard";
import UserNavbar from "../components/UserNavbar";
import { SignUp } from "../components/SignUp";
import SignIn from "../components/SignIn";
import { UserData } from "../context/UserData";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <UserData>
      <Router>
        <UserNavbar />
        <div className="container mt-4">
          <Routes>
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/" element={<UserCard />} />
          </Routes>
        </div>
      </Router>
    </UserData>
  );
}

export default App;
