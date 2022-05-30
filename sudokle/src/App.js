import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import WeeklyLeaderboard from "./WeeklyLeaderboard";
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import DailyLeaderBoard from "./DailyLeaderBoard";
import SudokuGrid from "./SudokuGrid";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            value: '',
            timeStarted: new Date().getTime(),
            timeTaken: 0,
        };

        this.handleChange = this.handleChange.bind(this);
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



    handleChange(event) {
        this.setState({value: event.target.value});
    }


    createUser = async(event) => {
        event.preventDefault();
        try{
            let res = await fetch('/api/sudokleQueries/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: this.state.value
                }),
            });
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Home/>} />
                            <Route path="DailyLeaderboard" element={<DailyLeaderBoard/>} />
                            <Route path="WeeklyLeaderboard" element={<WeeklyLeaderboard/>} />
                            <Route path="SudokuGrid" element={<SudokuGrid/>} />
                        </Route>
                    </Routes>

                    <div className="App">
                        <div id="navBar">
                            <div id="signInDiv"></div>
                            <table id="links">
                                <tbody>
                                <tr>
                                    <th>
                                        {this.state.user &&
                                        <div id="Home" >
                                            <button id="home" className="signinrequired">
                                                <NavLink to="/">
                                                    Home
                                                </NavLink>
                                            </button>
                                        </div>
                                        }
                                    </th>
                                    <td>
                                        {this.state.user &&
                                        <div id="Daily Leaderboard" className="signinrequired">
                                            <button id="dailyleader">
                                                <Link to="/DailyLeaderboard">
                                                    Daily Leaderboard
                                                </Link>
                                            </button>
                                        </div>
                                        }
                                    </td>
                                    <td>
                                        {this.state.user &&
                                        <div id="Weekly Leaderboard" className="signinrequired">
                                            <button id="weeklyleader">
                                                <NavLink to="/WeeklyLeaderboard">
                                                    Weekly Leaderboard
                                                </NavLink>
                                            </button>
                                        </div>
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            { this.state.user &&
                            <div id="googlebtncontainer" className="signinrequired">
                                <button id="googlebtn" onClick={ (e) => this.handleSignOut()}>Sign Out</button>
                            </div>
                            }
                            { this.state.user &&
                            <div id="userinfo" className="signinrequired">
                                <img id="pfp" src={this.state.user.picture}></img>
                                <h3 id="name">{this.state.user.name}</h3>
                            </div>
                            }
                        </div>
                    </div>
                </BrowserRouter>

                <form onSubmit={this.createUser}>
                    <label>
                        Email:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Add Test User" />
                </form>



            </div>

        );
    }
}

export default App;
