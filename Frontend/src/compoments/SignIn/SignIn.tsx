import React, { useState } from "react";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Typography } from "@material-ui/core";

import { DialogSignIn } from "./DialogSignIn"; //окно входа
import { DialogSignUp } from "./DialogSignUp"; //окно регистрации

const useStyles = makeStyles({
  wrapper: {
    height: "100vh",
    display: "flex",
  },
  leftBlock: {
    width: "50%",
    minWidth: 320,
    backgroundColor: "DeepSkyBlue",
  },
  textBlock: {
    width: 400,
    margin: "0 auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  list: {
    display: "flex",
    color: "white",
    marginBottom: 30,
  },
  listText: {
    marginLeft: 10,
    fontWeight: 600,
  },
  rightBlock: {
    width: "50%",
    minWidth: 320,
  },
  actionBlock: {
    width: 320,
    margin: "0 auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  signUp: {
    backgroundColor: "DeepSkyBlue",
    width: "100%",
    borderRadius: "200px",
    color: "white",
    textTransform: "none",
    fontSize: 14,
    margin: "10px 0",
    "&:hover": {
      backgroundColor: "rgba(0, 191, 255, 0.54)",
    },
  },
  signIn: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: "200px",
    textTransform: "none",
    fontSize: 14,
    color: "DeepSkyBlue",
    border: "1px DeepSkyBlue solid",
    "&:hover": {
      backgroundColor: "rgba(0, 191, 255, 0.2)",
    },
  },
  twitterIcon: {
    fontSize: 40,
    color: "DeepSkyBlue",
    marginBottom: 20,
  },
  titleText: {
    letterSpacing: "0.06rem",
    fontWeight: 600,
  },
  subTitleText: {
    marginTop: 40,
    fontWeight: 600,
  },
});

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  //окно входа
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);

  const clickOpenSignIn = (): void => {
    setOpenSignIn(true);
  };

  //окно регистрации
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const clickOpenSignUp = (): void => {
    setOpenSignUp(true);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.leftBlock}>
        <Box className={classes.textBlock}>
          <Box className={classes.list}>
            <SearchIcon />
            <Typography className={classes.listText}>
              Читайте о том, что вам интересно.
            </Typography>
          </Box>

          <Box className={classes.list}>
            <PeopleIcon />
            <Typography className={classes.listText}>
              Узнайте, о чем говорят в мире.
            </Typography>
          </Box>

          <Box className={classes.list}>
            <ChatBubbleOutlineIcon />
            <Typography className={classes.listText}>
              Присоединяйтесь к общению.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.rightBlock}>
        <Box className={classes.actionBlock}>
          <TwitterIcon className={classes.twitterIcon} />
          <Typography variant="h5" className={classes.titleText}>
            Узнайте, что происходит в мире прямо сейчас
          </Typography>
          <Typography variant="body2" className={classes.subTitleText}>
            Присоединяйтесь к Твиттеру прямо сейчас!
          </Typography>
          <Button className={classes.signUp} onClick={clickOpenSignUp}>
            Зарегистрироваться
          </Button>
          <Button className={classes.signIn} onClick={clickOpenSignIn}>
            Войти
          </Button>
        </Box>
      </Box>

      <DialogSignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
      <DialogSignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
    </Box>
  );
};
