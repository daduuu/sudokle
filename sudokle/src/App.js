import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import LifeTimeLeaderboard from "./LifeTimeLeaderboard";
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import DailyLeaderBoard from "./DailyLeaderBoard";
import SudokuGrid from "./SudokuGrid";
import SignIn from "./SignIn";
import Splash from "./Splash";
import {getCreationDate, printPuzzle} from "./sudoku";
import SignUp from "./SignUp"



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            value: '',
            timeStarted: new Date().getTime(),
            timeTaken: 0,
        };

        var today = new Date();

        if(today.getHours() === 10 && today.getSeconds() === 0 && today.getMinutes() === 0){
            this.addPuzzle();
            this.resetUsers();
        }
       // this.addPuzzle();
        //this.addPuzzle();
        //this.resetUsers();

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


    resetUsers = async() => {
        try{
            const response = await fetch('/api/sudokleQueries/resetDailyUser')
            .then(res => console.log(res));
        }
        catch (e) {
            console.log(e);
        }
    };


    addPuzzle = async => {
        const {puzzle, board, string, sol} = printPuzzle();
        fetch("/api/sudokleQueries/addSudoku", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                puzzles: string,
                solutions: sol,
                creationDate: getCreationDate()
            })
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    }

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
                                <Route path="LifeTimeLeaderboard" element={<LifeTimeLeaderboard/>} />
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
