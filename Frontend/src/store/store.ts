import { configureStore } from '@reduxjs/toolkit'
import Tweets from '../reducers/Tweets'

export const store = configureStore({
  reducer: {
    tweets: Tweets
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch