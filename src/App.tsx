import { useState } from 'react'
import './App.css'

function App() {
  const [squarePositions, setSquarePositions] = useState<(number | string)[][]>([[0,0,0],[0,0,0],[0,0,0]])
  const [player, setPlayer] = useState(0)

  const handleClick = (row: number, column: number) => {
    if (squarePositions[row][column] !== 0) return

    const newSquarePositions = squarePositions.map((row) => [...row])
    const move = player === 0 ? 'X' : 'O'

    newSquarePositions[row][column] = move

    setSquarePositions(newSquarePositions)

    setPlayer((prev) => (prev === 0 ? 1 : 0))

    checkWinner(newSquarePositions)
  }

  const checkWinner = (squarePositions: (number | string)[][]) => {
    const winner = checkRows(squarePositions) || checkColumns(squarePositions) || checkDiagonals(squarePositions)

    if (winner) {
      alert(`The winner is ${winner}`)
      setSquarePositions([[0,0,0],[0,0,0],[0,0,0]])
      setPlayer(0)
    }

    return winner
  }

  const checkRows = (squarePositions: (number | string)[][]) => {
    for (let i = 0; i < 3; i++) {
      if (squarePositions[i][0] === squarePositions[i][1] && squarePositions[i][1] === squarePositions[i][2]) {
        return squarePositions[i][0]
      }
    }

    return null
  }

  const checkColumns = (squarePositions: (number | string)[][]) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (squarePositions[0][i] === squarePositions[1][i] && squarePositions[1][i] === squarePositions[2][i]) {
          return squarePositions[0][i]
        }
      }
    }

    return null
  }

  const checkDiagonals = (squarePositions: (number | string)[][]) => {
    if (squarePositions[0][0] === squarePositions[1][1] && squarePositions[1][1] === squarePositions[2][2]) {
      return squarePositions[0][0]
    }

    if (squarePositions[0][2] === squarePositions[1][1] && squarePositions[1][1] === squarePositions[2][0]) {
      return squarePositions[0][2]
    }
  }

  return (
    <div className="App">
      <div className="board">
        {squarePositions.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((square, squareIndex) => (
              <div
                key={squareIndex}
                className="square"
                onClick={() => handleClick(rowIndex, squareIndex)}
              >
                {square === 0 ? '' : square}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
