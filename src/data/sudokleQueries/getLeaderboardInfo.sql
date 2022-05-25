SELECT userId, userEmail, dailyPuzzleSolved, dailyPuzzleTimedSolved
FROM users
WHERE dailyPuzzleSolved = 1
ORDER BY dailyPuzzleTimedSolved