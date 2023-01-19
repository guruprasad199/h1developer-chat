import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
function Navigation() {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        window.location.replace("/");
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar>
                        <img src={logo} style={{ width: 50, height: 50 }} />
                    </Navbar>
                </LinkContainer>                
                    <Nav className="ms-auto">
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        <LinkContainer to="/chat">
                            <Nav.Link>Chat</Nav.Link>
                        </LinkContainer>
                        {user && <div style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'5px'}}>{user.name}</span> <Button variant="danger" onClick={handleLogout}>Logout</Button></div>}
                    </Nav>
              
            </Container>
        </Navbar>
    );
}

export default Navigation;
