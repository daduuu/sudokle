import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NEWDATE } from 'mysql/lib/protocol/constants/types';
import googleimg from './google.png'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import WeeklyLeaderboard from "./WeeklyLeaderboard";
import DailyLeaderBoard from "./DailyLeaderBoard";
import SudokuGrid from "./SudokuGrid";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: null,
			leaderBoardData: [],
			timeStarted: new Date().getTime(),
			timeTaken: 0,
		};
	}


	handleCallbackResponse = (response) => {
		console.log("Encoded token" + response.credential);
		var userObject = jwt_decode(response.credential);
		console.log(userObject);
		this.setState({
			...this.state,
			user: userObject,
		});
		//after signing in, hide the sign in button and show the other features
		document.getElementById("signInDiv").hidden = true;
		var list = document.getElementsByClassName("signinrequired");

		for(var x = 0; x < list.length; x++){
			list.item(x).hidden = false;
		}
	}

	handleSignOut = () => {
		this.setState({
			...this.state,
			user: [],
		})
		//after signing out, show the sign in button again and hide the other features
		document.getElementById("signInDiv").hidden = false;
		var list = document.getElementsByClassName("signinrequired");

		for(var x = 0; x < list.length; x++){
			list.item(x).hidden = true;
		}
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
							<table id="links">
							<th>
								{ this.state.user &&
										<div id="Home" className="signinrequired">
											<button id="home">
												<NavLink to="/">
													Home
												</NavLink>  
											</button>
										</div>
									}
								</th>
								<th>
									{ this.state.user &&
										<div id="Daily Leaderboard" className="signinrequired">
											<button id="dailyleader">
												<NavLink to="/DailyLeaderboard">
													Daily Leaderboard
												</NavLink>  
											</button>
										</div>
									}
								</th>
								<th>
								{this.state.user &&
									<div id="Weekly Leaderboard" className="signinrequired">
										<button id="weeklyleader">
											<NavLink to="/WeeklyLeaderboard">
												Weekly Leaderboard
											</NavLink>  
										</button>
									</div>
									
								}
								</th>
							</table>
								{ this.state.user && 
									<div id="googlebtncontainer" className="signinrequired">
										<button id="googlebtn" onClick={ (e) => this.handleSignOut()}>Sign Out</button>
									</div>
								}
								{ user &&
									<div id="userinfo" className="signinrequired">
										<img id="pfp" src={user.picture}></img>
										<h3 id="name">{user.name}</h3>
									</div>
								}
							
					</div>
					<Routes>
						<Route index element={<Home/>} />
						<Route path="DailyLeaderboard" element={<DailyLeaderBoard/>} />
						<Route path="WeeklyLeaderboard" element={<WeeklyLeaderboard/>} />
					</Routes>
				</div>
		);
	}
}

export default App;
