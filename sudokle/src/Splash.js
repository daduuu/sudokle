import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

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
                    <button id="leadButton">
                        <Link to="/DailyLeaderboard">
                            Check out your leaderboard standings!
                        </Link>
                    </button>
                </tr>
                </thead>
            </table>
        </header>
    );

}

export default Splash;