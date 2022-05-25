import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NEWDATE } from 'mysql/lib/protocol/constants/types';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      leaderBoardData: [],
      timeStarted: new Date().getTime(),
      timeFinished: 0,
	  timeTaken: 0,
    };
    this.brian = this.brian.bind(this);
  }

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
  brian(){
	const timeFinished = new Date().getTime();
    this.setState({
      ...this.state,
      timeFinished,
	  timeTaken: (timeFinished-this.state.timeStarted)/1000,
    });
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
                      <th onClick={this.brian}>Daily Time Solve</th>
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
