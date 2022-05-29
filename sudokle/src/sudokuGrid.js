import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(81).fill(null),
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
      const re = /^[0-9]$/;
      //const back = /""/;
      //const re = /^[^a-zA-z!@#$%^&*()_=+`~]$/;
      if(re.test(event.target.value)){
        const squares = this.state.squares.slice();
        squares[parseInt(event.target.name)] = event.target.value;
        this.setState({squares: squares,
        });
      }
      else{
        //flash a warning maybe?
        event.target.value = this.state.squares[event.target.name];
      }
    };
    
    renderSquare(i) {
        return <input type="text" class="one" name={i} onChange={this.getInputValue} />
    }
    renderRow(i){
      const row = [];
      for(let c=i; c<i+9; c++){
        row.push(<input type="text" class="one" name={c} onChange={this.getInputValue} />);
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
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<SudokuGrid />);