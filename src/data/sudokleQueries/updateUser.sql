UPDATE  users
SET dailyPuzzleSolved = 1, dailyPuzzleTimedSolved = ?, puzzlesSolved = puzzlesSolved + 1, averageTimeSolvedWeek = (averageTimeSolvedWeek + ?) / 2
WHERE userEmail = ?