import { Outlet, Link, useNavigate } from "react-router-dom";
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import {Navbar, NavLink, Container, Nav, Button} from "react-bootstrap";


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            value: '',
            timeStarted: new Date().getTime(),
            timeTaken: 0,
        };

    }
    
    render(){
        return(
            <>
            <Navbar bg="dark" variant="dark">
                <Container id="leftnavbar">
                    <Navbar.Brand as={Link} to="/">Sudokle</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/DailyLeaderBoard">DailyLeaderBoard</Nav.Link>
                        <Nav.Link as={Link} to="/LifeTimeLeaderboard">LifeTime Leaderboard</Nav.Link>
                        <Nav.Link as={Link} to="/SudokuGrid">Play!</Nav.Link>

                    </Nav>
                </Container >
                <Nav id="rightnavbar">
                    <Container id="signincontainer">
                        <Nav.Link as={Link} to="/SignIn">Sign in</Nav.Link>
                        <Nav.Link as={Link} to="/SignUp">Sign up</Nav.Link>
                    </Container>
                </Nav>

            </Navbar>
            <Outlet />
            </>
        );
    }

};

export default Layout;