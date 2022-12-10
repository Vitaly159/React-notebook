import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UsersTweet = {
  firstName: string;
  secondName: string;
  avatar: string;
};

type TweetType = {
  id: string;
  user: UsersTweet;
  text: string;
  time: string;
};

type User = {
  id: string;
  user: UsersTweet;
};

type States = {
  user: User[];
  tweets: TweetType[];
  showError: boolean
};

const initialState: States = {
  user: [],
  tweets: [],
  showError: false,
};

export const Tweets = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    getTweets(state, action: PayloadAction<TweetType[]>) {
      state.tweets = action.payload;
    },
    getUser(state, action: PayloadAction<User[]>) {
      state.user = action.payload;
    },
    onAddTweet(state, action) {
      state.tweets.push(action.payload);
    },
    setShowError(state, action: PayloadAction<boolean>) {
      state.showError = action.payload
    }
  },
});

export const { getTweets, getUser, onAddTweet, setShowError } = Tweets.actions;
export default Tweets.reducer;
