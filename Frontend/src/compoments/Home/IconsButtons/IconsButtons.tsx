import React, { useState } from "react";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, IconButton, Typography, Button } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/Search";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { AddTweet } from "./AddTweet";

const useStyles = makeStyles({
  iconsWrapper: {
    paddingTop: 13
  },
  logoBlock: {
    display: "flex",
    marginBottom: 10,
  },
  iconBlock: {
    display: "flex",
    top: -12,
    position: "relative"
  },
  twitterIcon: {
    color: "DeepSkyBlue",
    alignSelf: "center",
    fontSize: 30,
  },
  twitterIconBtn: {
    padding: "12px",
    top: -12,
  },
  notActiveIcon: {
    alignSelf: "center",
    fontSize: 27,
    color: 'black'
  },
  activeIcon: {
    color: "DeepSkyBlue",
    alignSelf: "center",
    fontSize: 27,
  },
  textIcon: {
    cursor: "pointer",
    fontWeight: 600,
    alignSelf: "center",
    marginLeft: 20,
    fontSize: 15,
  },
  button: {
    borderRadius: 30,
    "&:hover": {
      color: "DeepSkyBlue",
      backgroundColor: "rgba(0,190,256, 0.1)",
    },
  },
  buttonTwite: {
    width: "90%",
    backgroundColor: "DeepSkyBlue",
    borderRadius: "200px",
    color: "white",
    textTransform: "none",
    fontSize: 14,
    fontWeight: 600,
    top: -12,
    "&:hover": {
      backgroundColor: "rgba(0, 191, 255, 0.54)",
    },
  },
  buttonBlock: {
    textAlign: 'center'
  }
});

interface Menu {
  name: string;
  img: any;
}

const refreshPage = (): void => {
  window.location.reload();
};

export const ButtonsIcons: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  const [openAddTweet, setOpenAddTweet] = useState<boolean>(false);

  const clickOpenAddTweet = (): void => {
    setOpenAddTweet(true);
  };

  const [active, setActive] = useState<string>("Главная");

  const getActive = (value: string): void => {
    setActive(value);
  };

  const isActiveIconStyle = (value: string): string => {
    const style = active === value ? classes.activeIcon : classes.notActiveIcon;
    return style;
  };

  const icons: Menu[] = [
    {
      name: "Главная",
      img: <HomeOutlinedIcon className={isActiveIconStyle("Главная")} />,
    },
    {
      name: "Поиск",
      img: <SearchIcon className={isActiveIconStyle("Поиск")} />,
    },
    {
      name: "Уведомления",
      img: <NotificationsNoneIcon className={isActiveIconStyle("Уведомления")} />,
    },
    {
      name: "Сообщения",
      img: <MailOutlineIcon className={isActiveIconStyle("Сообщения")} />,
    },
    {
      name: "Закладки",
      img: <BookmarkBorderIcon className={isActiveIconStyle("Закладки")} />,
    },
    {
      name: "Списки",
      img: <ListAltIcon className={isActiveIconStyle("Списки")} />,
    },
    {
      name: "Профиль",
      img: <PersonOutlineIcon className={isActiveIconStyle("Профиль")} />,
    },
    {
      name: "Еще",
      img: <MoreHorizIcon className={isActiveIconStyle("Еще")} />,
    },
  ];

  return (
    <Box>
      <List component="nav" className={classes.iconsWrapper}>
        <Box className={classes.logoBlock}>
          <IconButton onClick={refreshPage} className={classes.twitterIconBtn}>
            <TwitterIcon className={classes.twitterIcon} />
          </IconButton>
        </Box>

        {icons.map((icon, index) => (
          <Box
            className={classes.iconBlock}
            key={index}
            onClick={() => getActive(icon.name)}
          >
            <IconButton className={classes.button}>
              {icon.img}
              <Typography
                className={`${classes.textIcon} ${isActiveIconStyle(
                  icon.name
                )}`}
              >
                {icon.name}
              </Typography>
            </IconButton>
          </Box>
        ))}
      </List>
      <Box className={classes.buttonBlock}>
        <Button className={classes.buttonTwite} onClick={clickOpenAddTweet}>Твитнуть</Button>
      </Box>

      <AddTweet openAddTweet={openAddTweet} setOpenAddTweet={setOpenAddTweet} />
    </Box>
  );
};
