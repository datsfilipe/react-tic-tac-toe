import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

type UpdateSquareParams = {
  row: number;
  column: number;
  value: number | string;
}

type SquarePositions = (number | string)[][]

const squarePositionsSlice = createSlice({
  name: 'squarePositions',
  initialState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  reducers: {
    updateSquare(state: SquarePositions, action: PayloadAction<UpdateSquareParams>) {
      const { row, column, value } = action.payload
      state[row][column] = value
    }
  }
})

const playerSlice = createSlice({
  name: 'player',
  initialState: 0,
  reducers: {
    updatePlayer(_, action: PayloadAction<number>) {
      return action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    squarePositions: squarePositionsSlice.reducer,
    player: playerSlice.reducer
  }
})

export const { updateSquare } = squarePositionsSlice.actions
export const { updatePlayer } = playerSlice.actions
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
