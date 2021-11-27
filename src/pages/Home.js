import {
  Container,
  IconButton,
  Typography,
  Tooltip,
  SpeedDial,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { grey } from "@mui/material/colors";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";

import NotesGrid from "../components/NotesGrid";
import TypeNavigation from "../components/TypeNavigation";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

import { useNavigate } from "react-router";
import Search from "../components/Search";
import TodoList from "../components/TodoList";
import AddTodoDialog from "../components/AddTodoDialog";

const ParentContainer = styled("div")(({ theme }) => ({
  backgroundColor: grey[100],
  minHeight: "100vh",
  color: theme.palette.text.primary,
}));

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  paddingBlock: theme.spacing(8),
  "#greeting": {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 50,
    },
  },
}));

const AddButton = styled(Box)(({ theme }) => ({
  width: "fit-content",
  position: "sticky",
  top: 20,
  bottom: 20,
  paddingTop: "40px",
  paddingBottom: "40px",
  zIndex: 5,
  left: "80%",
  [theme.breakpoints.up("sm")]: {
    left: "100%",
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const {
    theUser,
    logoutUser,
    isAuth,
    getMemos,
    getActives,
    getCompleted,
    getTodos,
    toggleMemoTodo,
    setToggleAddTodo,
    searchOn,
  } = useContext(AppContext);

  useEffect(() => {
    getMemos(theUser.id);
  }, [getMemos, theUser]);

  useEffect(() => {
    if (!searchOn) {
      theUser && getTodos(theUser.id);
    }
    getActives();
    getCompleted();
  }, [theUser, getTodos, getActives, getCompleted, searchOn]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  const handleAddClick = () => {
    if (toggleMemoTodo) {
      if (Number(theUser.id) === 8)
        alert("create an account to access this feature");
      else navigate("/create", { replace: true });
    } else {
      setToggleAddTodo(true);
    }
  };

  return (
    <ParentContainer>
      <Container sx={{ position: "relative", minHeight: "100vh" }}>
        <Header>
          <Typography id="greeting" component="h1" variant="h4">
            Hello, {theUser.name}!
          </Typography>
          <Tooltip title="Logout">
            <IconButton onClick={logoutUser}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Header>

        <Search />

        <TypeNavigation />

        {toggleMemoTodo ? <NotesGrid /> : <TodoList />}

        <AddButton>
          <Tooltip
            title={toggleMemoTodo ? "Add new note" : "Add new task"}
            placement="left"
          >
            <SpeedDial
              ariaLabel="SpeedDial openIcon example"
              icon={<CreateIcon />}
              onClick={handleAddClick}
              sx={{ m: 0 }}
            ></SpeedDial>
          </Tooltip>
        </AddButton>
      </Container>
      <AddTodoDialog />
    </ParentContainer>
  );
};

export default Home;
