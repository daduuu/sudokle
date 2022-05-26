import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NEWDATE } from 'mysql/lib/protocol/constants/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import google from './google.png'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      leaderBoardData: [],
      timeStarted: new Date().getTime(),
      timeFinished: 0,
	  timeTaken: 0,
	  bestTime: [0],
    };
    this.handleClick = this.handleClick.bind(this);
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
  handleClick(){
	const timeFinished = !this.state.timeFinished? new Date().getTime() : this.state.timeFinished;
	const timeTaken = (timeFinished-this.state.timeStarted)/1000
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
  render() {

    const rows = this.getRows();

    return (
        <div className="App jumbotron">
          <button id="googlebtn">
              <div>
                <img src={google} id='googlogo'></img>
                <p>Sign in with Google</p>
              </div>
            </button>
          <header className="App-header">
            <h1 id="title">Sudokle</h1>
            <table>
              <thead>
                <tr>
                  <button id="playbtn">
                    Play
                  </button>
                </tr>
              </thead>
            </table>
          </header>
        </div>
    );
  }
}

export default App;
