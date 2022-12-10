import React, { useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { Dispatch, SetStateAction, useState } from "react";

const useStyles = makeStyles({
  signInWrapper: {
    "& .MuiDialog-paperWidthSm": {
      width: 400,
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
  error: {
    margin: "20px 20px 0",
    padding: 10,
    backgroundColor: "rgba(255,0,0,0.2)",
  },
});

interface Props {
  openSignUp: boolean;
  setOpenSignUp: Dispatch<SetStateAction<boolean>>;
}

export const DialogSignUp = ({ openSignUp, setOpenSignUp }: Props) => {
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const surNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);

  const [registerErrors, setRegisterErrors] = useState<string[]>([]);
  const [showErr, setShowErr] = useState<boolean>(false);
  console.log(registerErrors);

  const handleClose = (): void => {
    setOpenSignUp(false);
    setShowErr(false);
  };

  const showErrOn = (): void => {
    setShowErr(true);
  };

  const fetchRegistration = () => {
    const userData = {
      email: emailRef?.current?.value,
      secondname: surNameRef?.current?.value,
      firstname: nameRef?.current?.value,
      password: passwordRef?.current?.value,
      password2: passwordRef2?.current?.value,
    };

    fetch("/api/test", {
      method: "post",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (res) =>
          res.errors ?
          (showErrOn(), setRegisterErrors(res.errors.map((e: any) => e.msg))) : setShowErr(false)
      )
      .catch((err) => (showErrOn(), setRegisterErrors(["Ошибка: " + err])));
  };

  return (
    <Dialog
      open={openSignUp}
      onClose={handleClose}
      className={classes.signInWrapper}
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
        <Box className={classes.dialogHeader}>
          <CloseIcon onClick={handleClose} />
          <Typography variant="body1" className={classes.dialogHeaderText}>
            Создайте учетную запись
          </Typography>
        </Box>
      </DialogTitle>
      <TextField
        className={classes.input}
        label="Имя"
        variant="filled"
        inputRef={nameRef}
      />
      <TextField
        className={classes.input}
        label="Фамилия"
        variant="filled"
        inputRef={surNameRef}
      />
      <TextField
        className={classes.input}
        label="Email"
        variant="filled"
        inputRef={emailRef}
      />
      <TextField
        className={classes.input}
        label="Пароль"
        variant="filled"
        inputRef={passwordRef}
      />
      <TextField
        className={classes.input}
        label="Пароль еще раз"
        variant="filled"
        inputRef={passwordRef2}
      />

      {showErr && (
        <Box className={classes.error}>
          {registerErrors.map((err, index) => (
            <p key={index}>{`- ${err}`}</p>
          ))}
        </Box>
      )}

      <Button className={classes.buttonDialog} onClick={fetchRegistration}>
        Далее
      </Button>
    </Dialog>
  );
};
