import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home"
import WeeklyLeaderboard from "./WeeklyLeaderboard";
import {Container, Row, Col} from "react-bootstrap";


class SignUp extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
          confirm: '',
      }
      this.handleChange= this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlePChange = this.handlePChange.bind(this);
      this.handleCChange = this.handleCChange.bind(this);
  }

  handleChange(event){

      this.setState({
          email: event.target.value
      });
  }

  handlePChange(event){
      this.setState({
          password: event.target.value
      });
  }
  handleCChange(event){
      this.setState({
          confirm: event.target.value
      });
  }


  handleSubmit(event){
      if(this.state.email == ''){
          alert('Email input required')
      }
      else if(this.state.password == ''){
          alert('Password input required')
      }
      else if(this.state.password != this.state.confirm){
          alert('Confirm password does not match Password')
      }
      else{
        alert('A email was submitted: ' + this.state.email);
      }
      
      event.preventDefault();
  }


  render() {
    return (
        <div className="App">
          <header className="App-header">

            <h1>Sign Up</h1>
            <Container>
              <form onSubmit={this.handleSubmit}>
                  Email:
                  <input type="text" value={this.state.email} onChange={this.handleChange}/>
                  <br></br>
                  Password:
                  <input type="password" value={this.state.password} onChange={this.handlePChange}/>
                  <br></br>
                  Confirm Password:
                  <input type="password" value={this.state.confirm} onChange={this.handleCChange}/>
                  <br></br>
                  <input type="submit" value="Submit"/>
                </form>
              
            </Container>

          </header>
        </div>
    );
  }
}

export default SignUp;
