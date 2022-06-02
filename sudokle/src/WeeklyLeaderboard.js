import React, { Component } from 'react';
import './App.css';
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {Container, Row, Col} from "react-bootstrap";



class WeeklyLeaderboard extends Component {
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
    const response = await fetch('/api/sudokleQueries/getWeeklyLeaderboardInfo');
    const body = response.json();
    return body;
  };

  fetchData2 = async () => {
    const response = await fetch('/api/sudokleQueries/getWeeklyLeaderboardInfo2');
    const body = response.json();
    return body;
  };

  handleSort = async () =>{
    console.log("hi");
    this.fetchData2()
        .then(res => this.setState(
            {
              leaderBoardData:res
            }
        ))
        .catch(err => console.log(err));
}
  handleSort2 = async() =>{
    console.log("hi2");
    this.fetchData()
        .then(res => this.setState(
            {
              leaderBoardData:res
            }
        ))
        .catch(err => console.log(err));
  }

  getRows(){
    const rows = [];
    var count = 1;
    for(const user of this.state.leaderBoardData){
      const temp = this.secondsToTime(user.averageTimeSolvedWeek);
      rows.push(<Row key={user.userID}><Col sm={2}>Rank: {count}</Col><Col sm={3}>{user.userEmail}</Col><Col sm={2}>{user.puzzlesSolved}</Col><Col sm={4}>{temp.m} M {temp.s} S</Col><Col sm={1}></Col></Row>)
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
            <h1>Weekly Average Leaderboard</h1>
            <Container id="leaderboard">
              <Row>
                <Col sm={2}>Rank</Col>
                <Col sm={3}>Email</Col>
                <Col sm={2}>Puzzles Solved</Col>
                <Col sm={4}>Average Solve Time</Col>
                <Col sm={1}>
                  <DropdownButton id="dropdown-item-button" title="Sort By:">
                    <Dropdown.Item as="button" onClick={this.handleSort2}>Puzzles Solved</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handleSort}>Average Solve Time</Dropdown.Item>
                  </DropdownButton>
                </Col>

              </Row>
              {rows}
            </Container>
          </header>
        </div>
    );
  }
}

export default WeeklyLeaderboard;
