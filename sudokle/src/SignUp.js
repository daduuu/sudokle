import React, { Component } from 'react';
import './App.css';
import {Container, Row, Col} from "react-bootstrap";
import {setEMAIL, setLOGIN} from './globals';


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
        event.preventDefault();
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
        this.createUser(event);
        setEMAIL(this.state.email);
        setLOGIN(true);
      }
      
      
  }

  createUser = async(event) => {
    event.preventDefault();
    try{
        let res = await fetch('/api/sudokleQueries/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userEmail: this.state.email,
                pass: this.state.password
            }),
        });
    }
    catch (e) {
        console.log(e);
    }
    };

  render() {
    return (
        <div className="App">
          <header className="App-header">

            <h1>Sign Up</h1>
            <Container>
                <div id="loginform">
                    <form onSubmit={this.handleSubmit}>
                        <p>Email:</p>
                        <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="example@gmail.com"/>
                        <br></br>
                        <p>Password:</p>
                        <input type="password" value={this.state.password} onChange={this.handlePChange}/>
                        <br></br>
                        <p>Confirm Password:</p>
                        <input type="password" value={this.state.confirm} onChange={this.handleCChange}/>
                        <br></br>
                        <input id="submitbtn" type="submit" value="Submit"/>
                    </form>
                </div>
              
            </Container>

          </header>
        </div>
    );
  }
}

export default SignUp;
