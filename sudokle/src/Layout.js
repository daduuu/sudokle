import { Outlet, Link, useNavigate, Redirect} from "react-router-dom";
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import {Navbar, NavLink, Container, Nav, Button} from "react-bootstrap";
import {LOGIN, EMAIL, setEMAIL, setLOGIN} from "./globals";


function SignOut(){
    setEMAIL("");
    setLOGIN(false);
    alert("You have signed out")
}

const ShowSignIn = () => (
    <Nav id="rightnavbar">
        <Container id="signincontainer">
            <Nav.Link as={Link} to="/SignIn">Sign in</Nav.Link>
            <Nav.Link as={Link} to="/SignUp">Sign up</Nav.Link>
        </Container>
    </Nav>
);

const ShowSignOut = () => (
    <Nav id="rightnavbar">
        <Container id="signincontainer">
\        <button onClick={SignOut}>Sign Out</button>
       </Container>
    </Nav>
);


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
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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
                {LOGIN ? <ShowSignOut /> : <ShowSignIn />}

            </Navbar>
            <Outlet />
            </>
        );
    }

};

export default Layout;