import React, { useEffect, useState } from "react";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
//store
import { useAppDispatch } from "../../../hooks/hooks";
import { getTweets } from "../../../reducers/Tweets";

import axios from "axios";
//компоненты
import { AllTweets } from "./AllTweets/AllTweets";
import { ChosenTweet } from "./ChosenTweet";

const useStyles = makeStyles({
  errorBlock: {
    padding: "15px",
  },
  error: {
    backgroundColor: "rgba(255,0,0,0.1)",
    display: "flex",
    padding: "10px",
  },
  iconWarning: {
    color: "red",
    fontSize: 16,
    marginRight: 5,
  },
});

type UsersTweet = {
  firstName: string;
  secondName: string;
  avatar: string;
};

type TweetType = {
  id: string;
  user: UsersTweet;
  text: string;
  time: string
};

export const TweetsBlock: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [loadingTweetsError, setLoadingTweetsError] = useState<boolean>(false);
  const [isLoadingTweets, setIsLoadingTweets] = useState<boolean>(true);

  const [showChosenTweet, setShowChosenTweet] = useState<
    (TweetType | undefined)[]
  >([]);

  useEffect(() => {
    const postReq = async () => {
      await axios
        .get("https://636f5720f2ed5cb047db0d0f.mockapi.io/api/v1/tweets/1")
        .then((res) => {
          dispatch(getTweets(res.data));
          setLoadingTweetsError(false);
          setIsLoadingTweets(false);
        })
        .catch((error) => {
          setLoadingTweetsError(true);
          setIsLoadingTweets(false);
        });
    };
    postReq();
  }, [dispatch]);

  return (
    <Paper>
      {showChosenTweet[0] ? (
        <ChosenTweet
          showChosenTweet={showChosenTweet}
          setShowChosenTweet={setShowChosenTweet}
        />
      ) : (
        <AllTweets
          setShowChosenTweet={setShowChosenTweet}
          isLoadingTweets={isLoadingTweets}
        />
      )}

      {loadingTweetsError && (
        <Box className={classes.errorBlock}>
          <Box className={classes.error}>
            <ErrorOutlineIcon className={classes.iconWarning} />
            <span>Ошибка при загрузке твитов</span>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
