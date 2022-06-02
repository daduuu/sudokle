import React from 'react';
import ReactDOM from 'react-dom/client';
import './SudokuGrid.css';
import classNames from 'classnames'
import {makePuzzle, pluck, printPuzzle} from "./sudoku";
import {Navigate} from 'react-router-dom';

class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: [],
            given: "",
            valSpots: [],
            sol: "",
            solved: false,
            time: {
                h: 0,
                m: 0,
                s: 0
            },
            seconds: 0,
            userEmail: ""
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countUp = this.countUp.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let dm = secs % (60 * 60);
        let minutes = Math.floor(dm / 60);

        let ds = dm % 60;
        let seconds = Math.ceil(ds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds
        };
        return obj;
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countUp, 1000);
        }
    }

    countUp() {
        let seconds = this.state.seconds + 1;

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

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
                    solved: false,
                    time: {
                        h: 0,
                        m: 0,
                        s: 0
                    }
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

    handleSolved = async() => {
        try{
            let res = await fetch('/api/sudokleQueries/updateUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dailyPuzzleTimedSolved: this.state.seconds,
                    averageTimeSolvedWeek: this.state.seconds,
                    userEmail: "test@test"
                }),
            });
        }
        catch (e) {
            console.log(e);
        }

    }

    getInputValue = (event)=>{
        //let the input field change only if it's being changed to a number 0-9
        const re = /^[1-9\b]$/;
        //const back = /[\b]/;
        const index = parseInt(event.target.name);
        let input = event.target.value.trim();
        let validSpot = (this.state.valSpots[index]);
        //console.log(this.state.valSpots[index]);
        //console.log(this.state.given[1]);
        if((re.test(input) || input==="") && validSpot){
            if(input === ""){
                input = " ";
            }
            const squares = this.state.squares.slice();
            const given = this.state.given.slice().substring(0, index) + input + this.state.given.slice().substring(index + 1);
            //const given = this.state.sol;
            squares[index] = input;
            this.setState({
                valSpots: this.state.valSpots,
                sol: this.state.sol,
                solved: false,
                squares: squares,
                given: given
            });
            if(given === this.state.sol){
                this.setState({
                    solved: true
                });
                this.handleSolved()
                    .then(res => {
                        console.log("Solved!!");
                    });
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
        if(this.state.seconds === 0){
            this.startTimer();
        }

        if(this.state.solved){
            return(
                <Navigate to="/Splash" state={{
                    minutes: this.state.time.m,
                    seconds: this.state.time.s}}/>
            );
        }
        else{
            return (
                <div>
                    <div className="status">{status}</div>
                    {this.renderGrid()}
                    <div className="timer">
                        <p>{this.state.time.m} : {this.state.time.s}</p>
                    </div>
                </div>
            );
        }

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