import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import { useContext } from "react";
import { AppContext } from "../App";

const BackLink = styled(Link)(({ theme }) => ({
  textAlign: "left",
  textDecoration: "none",
  left: 0,
  width: "fit-content",
  paddingBlock: theme.spacing(3),
  "#link": {
    textDecoration: "none",
  },
  "#button": {
    display: "flex",
    alignItems: "flex-start",
    color: theme.palette.text.secondary,
  },
}));

const HomeButton = () => {
  const { setShowThemes } = useContext(AppContext);
  const handleClick = () => {
    setShowThemes(false);
  };
  return (
    <BackLink id="link" to="/home" onClick={handleClick}>
      <Button id="button" startIcon={<HomeIcon />}>
        Home
      </Button>
    </BackLink>
  );
};

export default HomeButton;
