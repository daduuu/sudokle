import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NEWDATE } from 'mysql/lib/protocol/constants/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import googleimg from './google.png'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      leaderBoardData: [],
      timeStarted: new Date().getTime(),
      timeTaken: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleCallbackResponse = (response) => {
		console.log("Encoded token" + response.credential);
		var userObject = jwt_decode(response.credential);
		console.log(userObject);
    this.setState({
      ...this.state,
      user: userObject,
    });
		document.getElementById("signInDiv").hidden = true;
	}

	handleSignOut = () => {
		this.setState({
      ...this.state,
      user: [],
    })
		document.getElementById("signInDiv").hidden = false;
	}

  
  componentDidMount() {
    /* global google */
    google.accounts.id.initialize({
			client_id: "1097344085485-1nnqi4bhqte2ah3ek71g4325rpnojmtk.apps.googleusercontent.com",
			callback: this.handleCallbackResponse
		});

		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{ theme: "", size: ""}
		);

		google.accounts.id.prompt();
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
    const user = this.state.user;
    return (
        <div className="App">
          <div id="navBar">
              <div id="signInDiv"></div>
              { this.state.user && 
                <div id="googlebtncontainer">
                  <button id="googlebtn" onClick={ (e) => this.handleSignOut()}>Sign Out</button>
                </div>
              }
              { user &&
                <div id="userinfo">
                  <img id="pfp" src={user.picture}></img>
                  <h3 id="name">{user.name}</h3>
                </div>
              }
              { user &&
                <div id="Leaderboard">
                  <button id="leaderbtn">Leaderboard</button>
                </div>
              }
          </div>

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
