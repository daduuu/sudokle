import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.fetchData()
        .then(res => console.log(res))
        .catch(err => console.log(err));
  }

  fetchData = async () => {
    const response = await fetch('/api/sudokleQueries/getLeaderboardInfo');
    const body = response.json();

    return body;
  };

  render() {
    //console.log(this.state.data);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Data from the Backend</h1>
          </header>
        </div>
    );
  }
}

export default App;
