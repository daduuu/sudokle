import React, { Component } from 'react';
import { Outlet, Link, Navigate, Route} from "react-router-dom";
import './App.css';
import {Container, Row, Col, Button} from "react-bootstrap";
import Layout from "./Layout";
import {EMAIL, LOGIN,setEMAIL, setLOGIN} from './globals';



class SignIn extends Component {
  
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
          users: this.handleSort(),
      }
      this.handleChange= this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlePChange = this.handlePChange.bind(this);
      const {navigation} = this.props;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
  handleSubmit(event){
    event.preventDefault();
      if(this.state.email == ''){
          alert('Email input required')
      }
      else if(this.state.password == ''){
          alert('Password input required')
      }
      else{
        this.setState({
            users: this.handleSort(),
        })
        const found = this.state.users.some(element =>{
            if(element.userEmail == this.state.email){
                if(element.pass == this.state.password){
                    return true;
                }
            }
            return false;
        });
        if(found){
            setEMAIL(this.state.email);
            setLOGIN(true);
        }
        else{
            alert('Incorrect email or password');
        }
      }
      
      
  }
  ShowSignIn = () => (
    <header className="App-header">

      <h1>Sign In</h1>
      <Container>
        <div id="loginform">
          <form onSubmit={this.handleSubmit}>
              <div id="emailinput">
                <p>Email:</p>
                <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="example@gmail.com"/>
                <br></br>
              </div>
              <div id="pwdinput">
                <p>Password:</p>
                <input type="password" value={this.state.password} onChange={this.handlePChange}/>
                <br></br>
              </div>
              <input id="submitbtn" type="submit" value="Submit"/>
            </form>
          </div>
        
      </Container>

    </header>
);

ShowHomeButton = () => (
    <header className="App-header">
      <h1>Hi {EMAIL}</h1>
    <Button id="playbtn">
          <Link to="/" id="playLink">
              Go back Home
          </Link>
    </Button>
    </header>
);
  fetchUsers = async () => {
    const response = await fetch('/api/sudokleQueries/getUsers');
    const body = response.json();
    return body;
  };

  handleSort = async () =>{
    console.log("hi");
    this.fetchUsers()
        .then(res => this.setState(
            {
              users:res
            }
        ))
        .catch(err => console.log(err));
}
  render() {
    return (
      <div className="App">
      {LOGIN ? <this.ShowHomeButton/> : <this.ShowSignIn/>}
      </div>
    );
  }
}

export default SignIn;
