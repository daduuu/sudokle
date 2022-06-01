import { Outlet, Link } from "react-router-dom";
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


    handleCallbackResponse = (response) => {
        console.log("Encoded token" + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        this.setState({
            ...this.state,
            user: userObject,
        });
        //after signing in, hide the sign in button and show the other features
        document.getElementById("signInDiv").hidden = true;
        var list = document.getElementsByClassName("signinrequired");

        for(var x = 0; x < list.length; x++){
            list.item(x).hidden = false;
        }

    }

    handleSignOut = () => {
        this.setState({
            ...this.state,
            user: [],
        })
        //after signing out, show the sign in button again and hide the other features
        document.getElementById("signInDiv").hidden = false;
        var list = document.getElementsByClassName("signinrequired");

        for(var x = 0; x < list.length; x++){
            list.item(x).hidden = true;
        }
    }


    componentDidMount() {
        /* global google */
        google.accounts.id.initialize({
            client_id: "1097344085485-1nnqi4bhqte2ah3ek71g4325rpnojmtk.apps.googleusercontent.com",
            callback: this.handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "", size: ""}
        );

        //google.accounts.id.prompt();
    }
    render(){

        return(
            <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Sudokle</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/DailyLeaderBoard">DailyLeaderBoard</Nav.Link>
                        <Nav.Link as={Link} to="/WeeklyLeaderboard">Weekly Leaderboard</Nav.Link>
                        <Nav.Link as={Link} to="/SudokuGrid">Play!</Nav.Link>

                    </Nav>
                </Container>
                <Nav>
                    <Container id="signincontainer">
                        <Button id="ssignInDiv" className="justify-content-end">Sign in</Button>
                    </Container>
                </Nav>

            </Navbar>
            <Outlet />
            </>
        );
    }

};

export default Layout;