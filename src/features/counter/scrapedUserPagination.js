// import { Container } from "react-bootstrap";
// import Pagination from "react-bootstrap/Pagination";
// import { useState } from "react";

// function UserPagination({ userData }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(9);

//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <Container>
//       <Pagination>
//         <Pagination.First onClick={() => paginate(1)} />
//         {currentPage > 1 && (
//           <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
//         )}
//         {Array.from({ length: Math.ceil(userData.length / usersPerPage) }).map(
//           (_, index) => {
//             if (
//               index === 0 ||
//               index === Math.ceil(userData.length / usersPerPage) - 1 ||
//               Math.abs(index + 1 - currentPage) <= 1
//             ) {
//               return (
//                 <>
//                   <Pagination.Item
//                     key={index}
//                     onClick={() => paginate(index + 1)}
//                     active={index + 1 === currentPage}
//                     disabled={index + 1 === currentPage}>
//                     {index + 1}
//                   </Pagination.Item>
//                   <Pagination.Ellipsis />
//                 </>
//               );
//             }
//           }
//         )}
//         {currentPage < Math.ceil(userData.length / usersPerPage) && (
//           <Pagination.Next onClick={() => paginate(currentPage + 1)} />
//         )}
//         <Pagination.Last
//           onClick={() => paginate(Math.ceil(userData.length / usersPerPage))}
//         />
//       </Pagination>
//     </Container>
//   );
// }

// export default UserPagination;
