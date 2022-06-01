import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home"
import WeeklyLeaderboard from "./WeeklyLeaderboard";
import {Container, Row, Col} from "react-bootstrap";


class SignIn extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
      }
      this.handleChange= this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
      this.setState({
          email: event.target.value
      });
  }

  handleSubmit(event){
      if(this.state.email == ''){
          alert('Email input required')
      }
      else if(this.state.password == ''){
          alert('Password input required')
      }
      else{
        alert('A email was submitted: ' + this.state.email);
      }
      
      event.preventDefault();
  }


  render() {
    console.log("hi");
    return (
        <div className="App">
          <header className="App-header">

            <h1>Sign In</h1>
            <Container>
              <form onSubmit={this.handleSubmit}>
                  Email:
                  <input type="text" value={this.state.email} onChange={this.handleChange}/>
                  <br></br>
                  Password:
                  <input type="text" value={this.state.password} onChange={this.handleChange}/>
                  <br></br>
                  <input type="submit" value="Submit"/>
                </form>
              
            </Container>

          </header>
        </div>
    );
  }
}

export default SignIn;
