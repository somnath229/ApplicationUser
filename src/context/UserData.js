import React, { useState, useEffect } from "react";
import LoginContext from "./LoginContext";
import axios from "axios";

export function UserData({ children }) {
  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  //getprofileData
  useEffect(() => {
    getprofileData();
  }, []);

  const getprofileData = async () => {
    try {
      const userResponse = await fetch(
        "https://authenticationuser-nf9c.onrender.com/api/auth/getuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const userData = await userResponse.json();

      if (userData && userData.first_name) {
        setProfileData(userData);
        localStorage.setItem("firstName", userData.first_name);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //fetchData
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://authenticationuser-nf9c.onrender.com/api/auth/users"
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const id = localStorage.getItem("token");
  // Update a user
  const updateUser = async (email, gender, domain, available) => {
    try {
      const response = await fetch(
        `https://authenticationuser-nf9c.onrender.com/api/auth/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ email, gender, domain, available }),
        }
      );
      await response.json();

      // Update the profileData state with the updated user data
      setProfileData({ ...profileData, email, gender, domain, available });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user and logout
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://authenticationuser-nf9c.onrender.com/api/auth/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      await response.json();
      // Call logout function to log out the user
      logout();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //handle logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
  };

  return (
    <LoginContext.Provider
      value={{
        userData,
        profileData,
        fetchData,
        logout,
        getprofileData,
        updateUser,
        deleteUser,
      }}>
      {children}
    </LoginContext.Provider>
  );
}
