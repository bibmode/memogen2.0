import {
  Container,
  IconButton,
  Typography,
  InputBase,
  Tooltip,
  SpeedDial,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { grey } from "@mui/material/colors";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";

import NotesGrid from "../components/NotesGrid";
import TypeNavigation from "../components/TypeNavigation";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

import { useNavigate } from "react-router";

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

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  border: "1.5px solid #bdbdbd",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "50%",
    transform: "translateX(-50%)",
    width: "70%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flexGrow: 1,
  marginLeft: 0,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
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
  const { getData, theUser, logoutUser, isAuth } = useContext(AppContext);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

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

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search notes…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <TypeNavigation />

        <NotesGrid />
        <AddButton>
          <Tooltip title="Add new note" placement="left">
            <SpeedDial
              ariaLabel="SpeedDial openIcon example"
              icon={<CreateIcon />}
              onClick={() => navigate("/create", { replace: true })}
              sx={{ m: 0 }}
            ></SpeedDial>
          </Tooltip>
        </AddButton>
      </Container>
    </ParentContainer>
  );
};

export default Home;
