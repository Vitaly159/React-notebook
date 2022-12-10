import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, TextField, Button } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import GifIcon from "@material-ui/icons/Gif";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import EventIcon from "@material-ui/icons/Event";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useAppSelector, useAppDispatch } from "../../../../hooks/hooks";
import { getUser, onAddTweet, setShowError } from "../../../../reducers/Tweets";

const useStyles = makeStyles({
  header: {
    padding: "13px 10px",
    fontWeight: 600,
    border: "1px rgb(230, 230, 230) solid",
  },
  createTwiteBlock: {
    borderBottom: "1px rgb(230, 230, 230) solid",
    padding: "10px 0",
  },
  writingField: {
    display: "flex",
  },
  form: {
    width: "100%",
    position: "relative",
    marginLeft: 10,
  },
  application: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px rgb(230, 230, 230) solid",
  },
  buttonTweet: {
    width: "100px",
    backgroundColor: "DeepSkyBlue",
    borderRadius: "200px",
    color: "white",
    textTransform: "none",
    fontSize: 14,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgba(0, 191, 255, 0.54)",
    },
    "&:disabled": {
      backgroundColor: "rgb(220,220,220)",
      color: "rgb(140,140,140)",
    },
  },
  space: {
    backgroundColor: "rgb(235,235,235)",
    height: 10,
  },
  progressBar: {
    display: "inline-block",
    width: 100,
    textAlign: "center",
  },
  errorBlock: {
    padding: "5px 15px 15px",
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

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      padding: 0,
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
})(TextField);

export const AllTweetsHeader: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.tweets.user);
  const showError = useAppSelector((state) => state.tweets.showError);
  const [isAddingTweet, setIsAddingTweet] = useState(false);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  let textInput = inputRef.current ? inputRef.current.value : "";

  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }

  const tweetTime = date.toLocaleString("ru", options);

  useEffect(() => {
    const fetchGetTweets = () => {
      fetch("https://636f5720f2ed5cb047db0d0f.mockapi.io/api/v1/tweets/user/", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          dispatch(getUser(json));
        });
    };
    fetchGetTweets();
  }, [dispatch]);

  const [textBar, setTextBar] = useState<number>(280);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length < 281) {
      setTextBar(280 - value.length);
      textInput = value;
    }
  };

  const clickAddTweet = () => {
    if (user[0]) {
      if (textInput.trim().length > 0) {
        const newTweet = {
          id: uuid(),
          user: {
            firstName: user[0].user.firstName,
            secondName: user[0].user.secondName,
            avatar: user[0].user.avatar,
          },
          text: textInput,
          time: tweetTime
        };

        postReq(newTweet);
        setIsAddingTweet(true);
      }
    } else {
      dispatch(setShowError(true));
      setTimeout(() => {
        dispatch(setShowError(false));
      }, 8000);
    }
  };

  async function postReq(value: any) {
    await axios
      .post(
        "https://636f5720f2ed5cb047db0d0f.mockapi.io/api/v1/tweets/1",
        value
      )
      .then((res) => {
        dispatch(onAddTweet(value));
        setIsAddingTweet(false);
        inputRef.current.value = "";
        setTextBar(280);
      })
      .catch((err) => {
        setIsAddingTweet(false);
        dispatch(setShowError(true));
        setTimeout(() => {
          dispatch(setShowError(false));
        }, 8000);
      });
  }

  return (
    <Box>
      <Box>
        <Typography className={classes.header}>Главная</Typography>
      </Box>
      <Box className={classes.createTwiteBlock}>
        <Box className={classes.writingField}>
          <Box style={{ paddingLeft: 20 }}>
            <Avatar alt="Remy Sharp" src={user[0] ? user[0].user.avatar : ""} />
          </Box>
          <Box className={classes.form}>
            <CssTextField
              inputRef={inputRef}
              placeholder={"Что происходит?"}
              label={null}
              multiline
              style={{ width: "90%" }}
              onChange={handleText}
              value={textInput ? textInput : ""}
              inputProps={{ maxLength: 280 }}
            />
          </Box>
        </Box>

        <Box>Отвечать могут все пользователи</Box>
      </Box>
      <Box className={classes.application}>
        <Box>
          <AddPhotoAlternateIcon />
          <GifIcon />
          <EqualizerIcon />
          <SentimentVerySatisfiedIcon />
          <EventIcon />
        </Box>
        <Box>
          {textInput.length > 0 && (
            <Box className={classes.progressBar}>
              <span>{textBar}</span>
              <CircularProgress
                variant="determinate"
                style={{ color: "rgb(220,220,220)", position: "absolute" }}
                size={20}
                thickness={4}
                value={100}
              />
              <CircularProgress
                variant="determinate"
                style={{ color: "blue", position: "absolute" }}
                size={20}
                thickness={4}
                value={(100 / 280) * textInput.length}
              />
            </Box>
          )}

          <Button
            className={classes.buttonTweet}
            onClick={clickAddTweet}
            disabled={textInput.trim().length === 0 ? true : false}
          >
            {isAddingTweet ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Твитнуть"
            )}
          </Button>
        </Box>
      </Box>
      {showError && (
        <Box className={classes.errorBlock}>
          <Box className={classes.error}>
            <ErrorOutlineIcon className={classes.iconWarning} />
            <span>Ошибка при добавлении твита</span>
          </Box>
        </Box>
      )}

      <Box className={classes.space} />
    </Box>
  );
};
