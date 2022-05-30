import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <header className="App-header">
            <h1 id="title">Sudokle</h1>
            <table>
                <thead>
                <tr>
                    <button id="playbtn">
                        <Link to="/SudokuGrid">
                            Play!
                        </Link>
                    </button>
                </tr>
                </thead>
            </table>
        </header>
    );
}

export default Home;