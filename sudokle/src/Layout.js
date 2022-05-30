import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/DailyLeaderBoard">Daily Leaderboard</Link>
                    </li>
                    <li>
                        <Link to="/WeeklyLeaderboard">Weekly Leaderboard</Link>
                    </li>
                    <li>
                        <Link to="/SudokuGrid">Sudoku Grid</Link>
                    </li>

                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;