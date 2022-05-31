SELECT userId, userEmail, puzzlesSolved, averageTimeSolvedWeek
FROM users
WHERE puzzlesSolved >= 1
ORDER BY puzzlesSolved DESC, averageTimeSolvedWeek