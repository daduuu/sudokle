import { Outlet, Link } from "react-router-dom";
import React, {Component} from "react";
import jwt_decode from "jwt-decode";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            value: '',
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
    }
    render(){
        return (
            <>
                <nav>
                    <ul>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <button>
                                        <Link to="/">Home</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button>
                                        <Link to="/DailyLeaderBoard">Daily Leaderboard</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button>
                                        <Link to="/WeeklyLeaderboard">Weekly Leaderboard</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button>
                                        <Link to="/SudokuGrid">Play</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <div className="App">
                                            <div id="navBar">
                                                <div id="signInDiv"></div>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </ul>

                </nav>

                <Outlet />
            </>
        )
    }

};

export default Layout;