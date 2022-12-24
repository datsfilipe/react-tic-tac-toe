import { atom } from 'jotai'

type SquarePositions = (string | number)[][]

type UpdateSquareParams = {
  row: number;
  column: number;
  value: string | number;
}

const squarePositionsAtom = atom<SquarePositions>([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
])

const playerAtom = atom(0)

const updateSquareAtom = atom(null, (get, set, { row, column, value }: UpdateSquareParams) => {
  const squarePositions = get(squarePositionsAtom)
  squarePositions[row][column] = value
  set(squarePositionsAtom, squarePositions)
})

const updatePlayerAtom = atom(null, (get, set, player: number) => {
  set(playerAtom, player)
})

export { squarePositionsAtom, updateSquareAtom, playerAtom, updatePlayerAtom }
