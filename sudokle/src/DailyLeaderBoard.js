import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home"
import WeeklyLeaderboard from "./WeeklyLeaderboard";


class DailyLeaderBoard extends Component {
  state = {
    leaderBoardData: []
  };

  componentDidMount() {
    this.fetchData()
        .then(res => this.setState({
          leaderBoardData: res
        }))
        //.then(res => console.log(res))
        .catch(err => console.log(err));
  }

  fetchData = async () => {
    const response = await fetch('/api/sudokleQueries/getLeaderboardInfo');
    const body = response.json();
    return body;
  };

  getRows(){
    const rows = [];
    var count = 1;
    for(const user of this.state.leaderBoardData){
      rows.push(<tr key={user.userID}><td>Rank: {count}</td><td>{user.userEmail}</td><td>{user.dailyPuzzleTimedSolved}</td></tr>)
      count++;
    }
    return rows;
  }

  render() {
    const rows = this.getRows();

    return (
        <div className="App">
          <header className="App-header">

            <h1>Daily Leaderboard</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Email</th>
                      <th>Daily Time Solve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
          </header>
        </div>
    );
  }
}

export default DailyLeaderBoard;
