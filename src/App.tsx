import { updateSquare, updatePlayer, useAppDispatch, useAppSelector } from './stores/GameStore'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const squarePositions = useAppSelector((state) => state.squarePositions)
  const player = useAppSelector((state) => state.player)

  const handleClick = (row: number, column: number) => {
    if (squarePositions[row][column] !== 0) return

    const move = player === 0 ? 'X' : 'O'

    dispatch(updateSquare({ row, column, value: move }))
    dispatch(updatePlayer(player === 0 ? 1 : 0))

    // clone to a temp variable because redux take a little to apply the change
    const tempSquarePositions: (number | string)[][] = squarePositions.map((row) => row.map((column) => column))
    tempSquarePositions[row][column] = move

    checkWinner(tempSquarePositions)
  }

  const checkWinner = (squarePositions: (number | string)[][]) => {
    const winner = checkRows(squarePositions) || checkColumns(squarePositions) || checkDiagonals(squarePositions)

    if (winner) {
      alert(`The winner is ${winner}`)
      dispatch(updateSquare({ row: 0, column: 0, value: 0 }))
      dispatch(updateSquare({ row: 0, column: 1, value: 0 }))
      dispatch(updateSquare({ row: 0, column: 2, value: 0 }))
      dispatch(updateSquare({ row: 1, column: 0, value: 0 }))
      dispatch(updateSquare({ row: 1, column: 1, value: 0 }))
      dispatch(updateSquare({ row: 1, column: 2, value: 0 }))
      dispatch(updateSquare({ row: 2, column: 0, value: 0 }))
      dispatch(updateSquare({ row: 2, column: 1, value: 0 }))
      dispatch(updateSquare({ row: 2, column: 2, value: 0 }))
      dispatch(updatePlayer(0))
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
      <div className="grid">
        <div className="square" onClick={() => handleClick(0, 0)}>{
          squarePositions[0][0] === 0 ? '' : squarePositions[0][0]
        }</div>
        <div className="square" onClick={() => handleClick(0, 1)}>{
          squarePositions[0][1] === 0 ? '' : squarePositions[0][1]
        }</div>
        <div className="square" onClick={() => handleClick(0, 2)}>{
          squarePositions[0][2] === 0 ? '' : squarePositions[0][2]
        }</div>
        <div className="square" onClick={() => handleClick(1, 0)}>{
          squarePositions[1][0] === 0 ? '' : squarePositions[1][0]
        }</div>
        <div className="square" onClick={() => handleClick(1, 1)}>{
          squarePositions[1][1] === 0 ? '' : squarePositions[1][1]
        }</div>
        <div className="square" onClick={() => handleClick(1, 2)}>{
          squarePositions[1][2] === 0 ? '' : squarePositions[1][2]
        }</div>
        <div className="square" onClick={() => handleClick(2, 0)}>{
          squarePositions[2][0] === 0 ? '' : squarePositions[2][0]
        }</div>
        <div className="square" onClick={() => handleClick(2, 1)}>{
          squarePositions[2][1] === 0 ? '' : squarePositions[2][1]
        }</div>
        <div className="square" onClick={() => handleClick(2, 2)}>{
          squarePositions[2][2] === 0 ? '' : squarePositions[2][2]
        }</div>
      </div>
    </div>
  )
}

export default App
