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
  const { theUser, logoutUser, isAuth, getMemos, notesData } =
    useContext(AppContext);

  useEffect(() => {
    getMemos(theUser.id);
  }, [getMemos, theUser]);

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

        <Search />

        <TypeNavigation />

        {notesData && <NotesGrid />}
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
