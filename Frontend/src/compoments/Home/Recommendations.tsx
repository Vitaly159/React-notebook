import React from "react";
//material ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      paddingTop: 7,
    },
    root: {
      backgroundColor: "rgba(240, 240, 240, 1)",
      borderRadius: 30,
      padding: "5px 10px",
      "& .MuiInputBase-root": {
        fontSize: "12px",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
      "& .MuiInput-underline": {
        "&:before": {
          borderBottom: "none",
        },
        "&:after": {
          borderBottom: "none",
        },
        "&:hover": {
          borderBottom: "none",
        },
      },
    },
  })
);

export const Recommendations: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          placeholder="поиск..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ opacity: 0.3 }} />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};
