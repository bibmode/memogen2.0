import { Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";

const Wrapper = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),
}));

const Link = styled("a")(() => ({
  color: "inherit",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
}));

const TypeNavigation = () => {
  const { setToggleMemoTodo } = useContext(AppContext);

  const openNotes = () => {
    setToggleMemoTodo(true);
  };

  const openTodos = () => {
    setToggleMemoTodo(false);
  };

  return (
    <Wrapper>
      <Breadcrumbs>
        <Typography color="text.primary" variant="subtitle2">
          <Link href="#" onClick={openNotes}>
            All Notes
          </Link>
        </Typography>
        <Typography color="inherit" variant="subtitle2" underline="hover">
          <Link href="#" onClick={openTodos}>
            To-dos
          </Link>
        </Typography>
      </Breadcrumbs>
    </Wrapper>
  );
};

export default TypeNavigation;
