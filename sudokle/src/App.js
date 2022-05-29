import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import WeeklyLeaderboard from "./WeeklyLeaderboard";
import React, {Component} from "react";
import DailyLeaderBoard from "./DailyLeaderBoard";
import SudokuGrid from "./SudokuGrid";



class App extends Component {

    render() {

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>} />
                        <Route path="DailyLeaderboard" element={<DailyLeaderBoard/>} />
                        <Route path="WeeklyLeaderboard" element={<WeeklyLeaderboard/>} />
                        <Route path="Play" element={<SudokuGrid/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
