# Sudokle
### Created by: [David Du](https://github.com/daduuu), [Elliot Lin](https://github.com/Falcons-Royale), [Adarsh Chilkunda](https://github.com/adroyalz), [Vikram Chilkunda](https://github.com/VikramChilkunda)

## Description
The web app Sudokle is daily sudoku game. Based off the popular game Wordle, Sudoku puzzles
are generated for players to solve. Players are timed once they start the puzzles, and once completed, their time is added to the leaderboards, both daily and lifetime leaderboards.

## How to run the app

First download the latest version of NodeJS

Then download the app and change into the directory like so

```bash
git clone https://github.com/daduuu/sudokle
cd sudokle
```
Then run the following command
```bash 
npm init
npm install
npm run dev
```

Now the app will be running on 
```bash
http://localhost:3000
```
Now have run playing!

## Technologies
- React.js
- Node.js
- Hapi
- MySQL
- HTML/CSS

#### SQL Server Hosting
We used https://remotemysql.com to remotely host our sql database

## Functionalities 
- Playable Sudoku Grid
- Sudoku Puzzle Generator and Solver
- User Resgistration/Login
- Leaderboard displays user data
    - Can sort lifetime leaderboard by time solved or puzzles solved
- User information updates everytime puzzles is solved
