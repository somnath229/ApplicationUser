// import React, { useEffect, useState } from "react";

// function ProfileData() {
//   const [profileData, setProfileData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const userResponse = await fetch(
//         "http://localhost:5000/api/auth/getuser",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         }
//       ); 

//       const userData = await userResponse.json();

//       if (userData && userData.first_name) {
//         setProfileData(userData);
//         localStorage.setItem("firstName", userData.first_name);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   return profileData;
// }

// export default ProfileData;
