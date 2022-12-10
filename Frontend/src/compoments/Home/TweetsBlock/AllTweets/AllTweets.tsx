import React from "react";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Avatar, Typography } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ReplyIcon from "@material-ui/icons/Reply";
import CircularProgress from "@material-ui/core/CircularProgress";
//store
import { useAppSelector } from "../../../../hooks/hooks";
import { Dispatch, SetStateAction } from "react";

import { AllTweetsHeader } from "./AllTweetsHeader";

const useStyles = makeStyles({
  post: {
    padding: 7,
    display: "flex",
    cursor: "pointer",
    borderBottom: "1px rgb(220,220,220) solid",
    "&:hover": {
      backgroundColor: "rgb(250,250,250)",
    },
  },
  names: {
    display: "flex",
    padding: 6,
  },
  myName: {
    fontWeight: 600,
    fontSize: 13,
  },
  friendsName: {
    marginLeft: 3,
    opacity: 0.5,
    fontSize: 13,
  },
  postsText: {
    padding: "0 6px",
    wordBreak: "break-all",
  },
  icons: {
    display: "flex",
    padding: "10px 52px 3px 0",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
    padding: 5,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "rgb(240,240,240)",
    },
  },
  progressBar: {
    textAlign: 'center',
    padding: 20
  },
  publishedTiem: {
    fontSize: 14,
    opacity: 0.5,
    padding: "10px 5px"
  }
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

interface Props {
  setShowChosenTweet: Dispatch<SetStateAction<(TweetType | undefined)[]>>;
  isLoadingTweets: boolean;
}

export const AllTweets = ({
  setShowChosenTweet,isLoadingTweets
}: Props): React.ReactElement => {
  const classes = useStyles();
  const tweets = useAppSelector((state) => state.tweets.tweets);

  const clickOnTweet = (value: any): void => {
    const tweet = [tweets.find((tweet) => tweet["id"] === value)];
    setShowChosenTweet(tweet);
  };

  return (
    <Paper>
      <AllTweetsHeader />

      {!isLoadingTweets ? (
        tweets
          .slice()
          .reverse()
          .map((tweet, index) => (
            <Box
              key={index}
              className={classes.post}
              onClick={() => {clickOnTweet(tweet["id"]);
              }}
            >
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={tweet.user.avatar && tweet.user.avatar}
                />
              </Box>

              <Box style={{ width: "100%" }}>
                <Box>
                  <Box className={classes.names}>
                    <Typography
                      className={classes.myName}
                    >{`${tweet.user.firstName} ${tweet.user.secondName}`}</Typography>
                    <Typography className={classes.friendsName}>
                      @userName
                    </Typography>
                  </Box>
                  <Box className={classes.postsText}>{tweet.text}</Box>
                  <Box className={classes.publishedTiem}>{tweet.time}</Box>
                </Box>
                <Box className={classes.icons}>
                  <Box>
                    <ChatBubbleOutlineIcon className={classes.icon} />
                    <span style={{ top: -8, position: "relative" }}>1</span>
                  </Box>
                  <Box>
                    <RepeatIcon className={classes.icon} />
                    <span style={{ top: -8, position: "relative" }}>1</span>
                  </Box>
                  <Box>
                    <FavoriteBorderIcon className={classes.icon} />{" "}
                    <span style={{ top: -8, position: "relative" }}>1</span>
                  </Box>

                  <Box>
                    <ReplyIcon className={classes.icon} />
                    <span style={{ top: -8, position: "relative" }}>1</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
      ) : (
        <Box className={classes.progressBar}>
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
};
