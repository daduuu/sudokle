import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import WeeklyLeaderboard from "./WeeklyLeaderboard";
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import DailyLeaderBoard from "./DailyLeaderBoard";
import SudokuGrid from "./SudokuGrid";
import SignIn from "./SignIn";
import Splash from "./Splash";
import SignUp from "./SignUp";
import {printPuzzle} from "./sudoku";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            value: '',
            timeStarted: new Date().getTime(),
            timeTaken: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleClick(){
        const timeFinished = !this.state.timeFinished? new Date().getTime() : this.state.timeFinished;
        const timeTaken = (timeFinished-this.state.timeStarted)/1000;
        let bestTime = this.state.bestTime;
        if(bestTime.length > 1){
            if(timeFinished < this.state.bestTime[1])
                bestTime[1] = timeTaken;
        }
        else{
            bestTime.push(timeTaken);
        }
        this.setState({
            ...this.state,
            timeFinished,
            timeTaken,
            bestTime: bestTime,
        });
    }



    handleChange(event) {
        this.setState({value: event.target.value});
    }


    createUser = async(event) => {
        event.preventDefault();
        try{
            let res = await fetch('/api/sudokleQueries/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: this.state.value
                }),
            });
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div id={"navBar2"}>
                        <Routes id={"linksR"}>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<Home/>} />
                                <Route path="SignUp" element={<SignUp/>}/>
                                <Route path="SignIn" element={<SignIn/>}/>
                                <Route path="DailyLeaderboard" element={<DailyLeaderBoard/>} />
                                <Route path="WeeklyLeaderboard" element={<WeeklyLeaderboard/>} />
                                <Route path="SudokuGrid" element={<SudokuGrid/>} />
                                <Route path="Splash" element={<Splash/>} />
                                <Route path="*" element={<Home/>} />
                            </Route>
                        </Routes>

                    </div>
                </BrowserRouter>
            </div>

        );
    }
}

export default App;
