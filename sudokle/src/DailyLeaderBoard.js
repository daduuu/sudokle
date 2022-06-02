import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home"
import LifeTimeLeaderboard from "./LifeTimeLeaderboard";
import {Container, Row, Col} from "react-bootstrap";


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
      const temp = this.secondsToTime(user.dailyPuzzleTimedSolved);
      rows.push(<Row key={user.userID}><Col>Rank: {count}</Col><Col>{user.userEmail}</Col><Col>{temp.m} M {temp.s} S</Col></Row>);
      count++;
    }
    return rows;
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let dm = secs % (60 * 60);
    let minutes = Math.floor(dm / 60);

    let ds = dm % 60;
    let seconds = Math.ceil(ds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }


  render() {
    const rows = this.getRows();

    return (
        <div className="App">
          <header className="App-header">

            <h1>Daily Leaderboard</h1>

            <Container>
              <Row>
                <Col>Rank</Col>
                <Col>Email</Col>
                <Col>Daily Time Solved</Col>
              </Row>
              {rows}
            </Container>

          </header>
        </div>
    );
  }
}

export default DailyLeaderBoard;
