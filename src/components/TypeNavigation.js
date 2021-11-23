import { Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";

const Wrapper = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),
}));

const Link = styled("a")(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
}));

const TypeNavigation = () => {
  const { getMemos, theUser } = useContext(AppContext);

  const handleClick = () => {
    getMemos(theUser.id);
  };
  return (
    <Wrapper>
      <Breadcrumbs>
        <Typography color="text.primary" variant="subtitle2">
          <Link href="#" onClick={handleClick}>
            All Notes
          </Link>
        </Typography>
        <Typography color="inherit" variant="subtitle2" underline="hover">
          To-dos
        </Typography>
      </Breadcrumbs>
    </Wrapper>
  );
};

export default TypeNavigation;
