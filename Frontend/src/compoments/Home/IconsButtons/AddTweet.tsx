import React, { useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import uuid from "react-uuid";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Box, Typography, Avatar, TextField, Button } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import GifIcon from "@material-ui/icons/Gif";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import EventIcon from "@material-ui/icons/Event";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Dispatch, SetStateAction } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { onAddTweet, setShowError } from "../../../reducers/Tweets";

const useStyles = makeStyles({
  wrapper: {
    "& .MuiDialog-paperWidthSm": {
      width: 500,
      borderRadius: "10px",
      padding: "0 0 15px",
    },
    "& .MuiSvgIcon-root": {
      color: "#1e90ff",
      fontSize: 20,
      "&:hover": {
        color: "blue",
        cursor: "pointer",
      },
    },
    "& .MuiDialogTitle-root": {
      padding: "13px 24px 10px 0",
    },
  },
  dialogHeader: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: "0 20px",
  },
  dialogHeaderText: {
    fontWeight: 700,
    marginLeft: 25,
    position: "relative",
  },
  dialogTitle: {
    borderBottom: "1px rgb(220,220,220) solid",
  },
  input: {
    margin: "10px 20px 0",
    "& .MuiInputLabel-filled": {
      transform: "translate(5px, 5px) scale(0.7)",
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(245,245,245)",
    },
  },
  buttonDialog: {
    backgroundColor: "DeepSkyBlue",
    borderRadius: "200px",
    color: "white",
    textTransform: "none",
    fontSize: 14,
    margin: "20px 20px 10px",
    "&:hover": {
      backgroundColor: "rgba(0, 191, 255, 0.54)",
    },
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
  buttonTwite: {
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

interface Props {
  openAddTweet: boolean;
  setOpenAddTweet: Dispatch<SetStateAction<boolean>>;
}

export const AddTweet = ({
  openAddTweet,
  setOpenAddTweet,
}: Props): React.ReactElement => {
  const classes = useStyles();
  const user = useAppSelector((state) => state.tweets.user);

  const dispatch = useAppDispatch();

  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }

  const tweetTime = date.toLocaleString("ru", options);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [textBar, setTextBar] = useState<number>(280);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length < 281) {
      inputRef.current.value = value;
      setTextBar(280 - value.length);
    }
  };

  const handleClose = (): void => {
    setOpenAddTweet(false);
  };

  async function postReq(value: any) {
    await axios
      .post(
        "https://636f5720f2ed5cb047db0d0f.mockapi.io/api/v1/tweets/1",
        value
      )
      .then((res) => {
        dispatch(onAddTweet(value));
        dispatch(setShowError(false));
        // inputRef.current.value = "";
      })
      .catch((err) => {
        dispatch(setShowError(true));
        setTimeout(() => {
          dispatch(setShowError(false));
        }, 8000);
      });
  }

  const clickAddTweet = () => {
    if (inputRef.current.value.trim().length > 0) {
      if (user[0]) {
        const newTweet = {
          id: uuid(),
          user: {
            firstName: user[0].user.firstName,
            secondName: user[0].user.secondName,
            avatar: user[0].user.avatar,
          },
          text: inputRef.current.value,
          time: tweetTime
        };

        handleClose();
        postReq(newTweet);
      } else {
        handleClose();
        dispatch(setShowError(true));
        setTimeout(() => {
          dispatch(setShowError(false));
        }, 8000);
      }
    }
  };

  return (
    <Dialog
      open={openAddTweet}
      onClose={handleClose}
      className={classes.wrapper}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Box className={classes.dialogHeader}>
          <CloseIcon onClick={handleClose} />
          <Typography
            variant="body1"
            className={classes.dialogHeaderText}
          ></Typography>
        </Box>
      </DialogTitle>

      <Box className={classes.createTwiteBlock}>
        <Box className={classes.writingField}>
          <Box style={{ paddingLeft: 20 }}>
            <Avatar alt="me" src={user[0] && user[0].user.avatar} />
          </Box>
          <Box className={classes.form}>
            <CssTextField
              inputRef={inputRef}
              value={inputRef.current ? inputRef.current.value : ""}
              placeholder="Что происходит?"
              label={null}
              multiline
              style={{ width: "90%" }}
              onChange={handleText}
              inputProps={{ maxLength: 280 }}
            />
          </Box>
        </Box>
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
          {inputRef.current && inputRef.current.value.length !== 0 && (
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
                value={(100 / 280) * inputRef.current.value.length}
              />
            </Box>
          )}

          <Button className={classes.buttonTwite} onClick={clickAddTweet}>
            Твитнуть
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
