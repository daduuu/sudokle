import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {Button, Container} from "react-bootstrap"

const Splash = () =>{

    const location = useLocation();

    return (
        <header className="App-header">
            <h1 id="title">You solved the puzzle!</h1>
            <table>
                <thead>
                <tr>
                    Your time: {location.state.minutes} minutes and {location.state.seconds} seconds!

                </tr>
                <tr>
                    <Container>
                        <Button id="leadButtona" size="lg">
                            <Link to="/DailyLeaderboard" id="leadButton">
                                Check out your leaderboard standings!
                            </Link>
                        </Button>
                    </Container>

                </tr>
                </thead>
            </table>
        </header>
    );

}

export default Splash;