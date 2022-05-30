import React from 'react';
import ReactDOM from 'react-dom/client';
import './SudokuGrid.css';
import classNames from 'classnames'
import {makePuzzle, pluck, printPuzzle} from "./sudoku";

class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: [],
            given: "",
            valSpots: [],
            sol: "",
            solved: false
        };
    }


    componentDidMount() {

        this.fetchData()
            .then(res => {


                const puzzles = res[0].puzzles;
                const solution = res[0].solution;

                const val = [];
                const re = /^[1-9\b]$/;
                const sqr = [];


                for (let i = 0; i < puzzles.length; i++){
                    if(re.test(puzzles.charAt(i))){
                        val[i] = false;
                    }
                    else{
                        val[i] = true;
                    }
                    sqr.push(puzzles.charAt(i));
                }
                this.setState( {
                    squares: sqr,
                    given: puzzles,
                    valSpots: val,
                    sol: solution,
                    solved: false
                });


            })
            //.then(res => console.log(res))
            .catch(err => console.log(err));



    }

    fetchData = async () => {
        const response = await fetch('/api/sudokleQueries/getDailySudokuGrid');
        const body = response.json();
        return body;
    };


    handleKeyPress = (event) => {
        const re = /^[0-9\b]+$/;
        if(re.test(event.key)){
            const squares = this.state.squares.slice();
            squares[0] = "valid";
        }
        else{
            console.log("no");
        }
    }

    getInputValue = (event)=>{
        //let the input field change only if it's being changed to a number 0-9
        const re = /[1-9]/;
        //const back = /[\b]/;
        const index = parseInt(event.target.name);
        const input = event.target.value.trim();
        let validSpot = (this.state.valSpots[index]);
        //console.log(this.state.valSpots[index]);
        //console.log(this.state.given[1]);
        if((re.test(input) || input==="") && validSpot){
            const squares = this.state.squares.slice();
            const given = this.state.given.slice().substring(0, index) + input + this.state.given.slice().substring(index + 1);
            squares[index] = input;
            this.setState({
                valSpots: this.state.valSpots,
                sol: this.state.sol,
                solved: false,
                squares: squares,
                given: given
            });
            if(given === this.state.sol){
                console.log("Solved!!");
            }
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
            row.push(<input type="text" autocomplete="off" className={liClasses} name={c} value={this.state.given[c]} onChange={this.getInputValue} />);
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
        let status = 'Now Playing - Sudokle';

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
            </div>
        );
    }
}

// ========================================

export default SudokuGrid;