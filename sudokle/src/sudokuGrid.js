import React from 'react';
import ReactDOM from 'react-dom/client';
import './SudokuGrid.css';
import classNames from 'classnames'

class Grid extends React.Component {
    constructor(props){
        super(props);
        const ogiven = Array(81).fill(null); //fill this with elliot's numbers
        //ogiven[1] = 8;  //set the first row second column number to 8, unchangeable by the user
        this.state = {
            squares: Array(81).fill(null),
            given: ogiven,
        };
    }


    handleKeyPress = (event) => {
        const re = /^[0-9\b]+$/;
        if(re.test(event.key)){
            const squares = this.state.squares.slice();
            squares[0] = "valid";
            this.setState({squares: squares,
            });
        }
        else{
           console.log("no");
        }
    }

    getInputValue = (event)=>{
      //let the input field change only if it's being changed to a number 0-9
      const re = /^[1-9\b]$/;
      //const back = /""/;
      //const re = /^[^a-zA-z!@#$%^&*()_=+`~]$/;
      const index = parseInt(event.target.name);
      const input = event.target.value;
      let validSpot = (this.state.given[index] === null);
      //console.log(this.state.given[1]);
      if((re.test(input) || input==="") && validSpot){
        const squares = this.state.squares.slice();
        squares[index] = input;
        this.setState({squares: squares,
        });
      }
      else{
        //flash a warning maybe?
        event.target.value = this.state.squares[event.target.name];
      }
    };

    renderRow(i){
      const row = [];
      let numSquares = 9;
      for(let c=i; c<i+9; c++){
        var liClasses = classNames({
            'one': true,
            'top': i===0 || i===3*numSquares || i===6*numSquares,
            'bot': i===(numSquares-1)*numSquares,
            'lside': c===0 || c%numSquares===0 || c%numSquares===3 || c%numSquares===6,
            'rside': c%(numSquares)===(numSquares-1),
            'given': this.state.given[c] != null,
        });
        row.push(<input type="text" className={liClasses} name={c} value={this.state.given[c]} onChange={this.getInputValue} />);
      }
      return row;
    }
    renderGrid(){
      const grid = [];
      for(let c=0; c<9; c++){
        grid.push(<div className="board-row"></div>);
        grid.push(this.renderRow(9*c));
      }
      return grid;
    }
    
    render() {
        let status = 'Now Playing - Sudokle'

      return (
        <div>
          <div className="status">{status}</div>
          {this.renderGrid()}
        </div>
      );
    }
  }
  
class SudokuGrid extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Grid/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
 export default SudokuGrid;