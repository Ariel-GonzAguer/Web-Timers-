import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(window.localStorage.getItem('localTimers')) || [];

const localTimersSlice = createSlice({
  name: 'localTimers',
  initialState: initialState,
  reducers: {
    addNewTimer: (state, action) => {
      state.push(action.payload);
      window.localStorage.setItem('localTimers', JSON.stringify(state));
    },
    deleteTimer: (state, action) => {
      const updatedState = state.filter(timer => timer.key !== action.payload);
      window.localStorage.setItem('localTimers', JSON.stringify(updatedState));
      return updatedState;
    },
    editTimer: (state, action) => {
      const updatedState = state.map(timer => timer.key === action.payload.key ? action.payload : timer);
      window.localStorage.setItem('localTimers', JSON.stringify(updatedState));
      return updatedState;
    }
  }
})

export const { addNewTimer, deleteTimer, editTimer } = localTimersSlice.actions
export default localTimersSlice.reducer