import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const Home = () => {
    return (
        <header className="App-header">
            <h1 id="title">Sudokle</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <Button id="playbtn">
                            <Link to="/SudokuGrid" id="playLink">
                                Play!
                            </Link>
                        </Button>
                    </tr>
                    </thead>
                </table>
            </div>

        </header>
    );
}

export default Home;