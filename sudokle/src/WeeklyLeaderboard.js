import React, { Component } from 'react';
import './App.css';



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

  getRows(){
    const rows = [];
    var count = 1;
    for(const user of this.state.leaderBoardData){
      rows.push(<tr key={user.userID}><td>Rank: {count}</td><td>{user.userEmail}</td><td>{user.puzzlesSolved}</td><td>{user.averageTimeSolvedWeek}</td></tr>)
      count++;
    }
    return rows;
  }

  render() {
    const rows = this.getRows();

    return (
        <div className="App">
          <header className="App-header">
            <h1>Weekly Average Leaderboard</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Email</th>
                      <th>Puzzles Solved</th>
                      <th>Weekly Average Time Solve</th>
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

export default WeeklyLeaderboard;
