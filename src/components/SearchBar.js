import { useContext, useRef, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container } from "react-bootstrap";
import LoginContext from "../context/LoginContext";

function SearchBar() {
  const context = useContext(LoginContext);
  const { profileData, updateUser, deleteUser } = context;
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({profileData});

  console.log(typeof profileData)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    setEditMode(true);
  };

  const ref = useRef(null);

  const handleSave = () => {
    if (ref.current) {
      ref.current.click();
    }
    setEditMode(false);
    console.log(userData);
    updateUser({
      email: userData.profileData.email,
      gender: userData.profileData.gender,
      domain: userData.profileData.domain,
      available: userData.profileData.available,
    });
  };

  const handleInputChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      profileData: {
        ...prevUserData.profileData,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleDelete = () => {
    // const userId = userData.profileData._id;
    const token = localStorage.getItem("token");
    deleteUser(token);
    setShow(false); // Close the Offcanvas after deletion
  };

  return (
    <div className="mx-2">
      <Button variant="primary" onClick={handleShow}>
        Profile
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={userData.profileData.avatar}
              alt="User Avatar"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <h5 style={{ margin: "0" }}>
              {userData.profileData.first_name} &nbsp;
              {userData.profileData.last_name}
            </h5>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={userData.profileData.email}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Gender"
                  name="gender"
                  value={userData.profileData.gender}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDomain">
                <Form.Label>Domain</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Domain"
                  name="domain"
                  value={userData.profileData.domain}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Availability"
                  name="availability"
                  value={userData.profileData.availability ? "Yes" : "No"}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </Form.Group>

              {editMode ? (
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SearchBar;
