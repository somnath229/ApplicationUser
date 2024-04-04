import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Pagination,
} from "react-bootstrap";

import LoginContext from "../context/LoginContext";

function UserCard() {
  let history = useNavigate();
  const context = useContext(LoginContext);
  const { fetchData, userData } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchData();
    } else {
      history("/signin");
    }
    // eslint-disable-next-line
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <Container className="d-flex justify-content-center my-5">
          <Row xs={1} md={3} className="g-4">
            {currentUsers.map((user) => (
              <Col key={user.id}>
                <Card
                  style={{
                    width: "18rem",
                    margin: "0 auto",
                    border: "5px solid black",
                    borderRadius: "2rem",
                  }}>
                  <Card.Img
                    variant="top"
                    src={user.avatar}
                    Card
                    style={{
                      border: "2px solid black",
                      borderRadius: "1rem",
                    }}
                  />
                  <Card.Body className="m-2">
                    <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text>Gender: {user.gender}</Card.Text>
                    <Card.Text>Domain: {user.domain}</Card.Text>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: user.available ? "green" : "gray",
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                      }}></div>
                    <Button variant="success" className="mx-2">
                      Chat
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Container className="d-flex justify-content-center my-5">
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} />
            {currentPage > 1 && (
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            )}
            {Array.from({
              length: Math.ceil(userData.length / usersPerPage),
            }).map((_, index) => {
              if (
                index === 0 ||
                index === Math.ceil(userData.length / usersPerPage) - 1 ||
                Math.abs(index + 1 - currentPage) <= 1
              ) {
                return (
                  <>
                    <Pagination.Item
                      key={index}
                      onClick={() => paginate(index + 1)}
                      active={index + 1 === currentPage}
                      disabled={index + 1 === currentPage}>
                      {index + 1}
                    </Pagination.Item>
                    <Pagination.Ellipsis />
                  </>
                );
              }
            })}
            {currentPage < Math.ceil(userData.length / usersPerPage) && (
              <Pagination.Next onClick={() => paginate(currentPage + 1)} />
            )}
            <Pagination.Last
              onClick={() =>
                paginate(Math.ceil(userData.length / usersPerPage))
              }
            />
          </Pagination>
        </Container>
      </div>
    </>
  );
}

export default UserCard;
