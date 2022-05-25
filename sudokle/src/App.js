import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
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
    for(const user of this.state.leaderBoardData){
      rows.push(<tr key={user.userID}><td>{user.userEmail}</td><td>{user.dailyPuzzleTimedSolved}</td></tr>)
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

export default App;
