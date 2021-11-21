import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createContext, useCallback, useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import CreateNote from "./pages/CreateNote";

import {
  blue,
  green,
  grey,
  orange,
  pink,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow["A700"],
    },
  },
});

export const AppContext = createContext(null);

//base url
const Axios = axios.create({
  baseURL: "http://localhost/memogen-backend/",
});

function App() {
  const [notesData, setNotesData] = useState(null);
  const [showThemes, setShowThemes] = useState(false);
  const [editedTheme, setEditedTheme] = useState("monochrome");

  //log in

  // Root State
  const [isAuth, setIsAuth] = useState(false);
  const [theUser, setTheUser] = useState(null);

  // On Click the Log out button
  const logoutUser = () => {
    localStorage.removeItem("loginToken");
    setIsAuth(false);
  };

  const registerUser = async (user) => {
    // Sending the user registration request
    const register = await Axios.post("register.php", {
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return register.data;
  };

  const loginUser = async (user) => {
    // Sending the user Login request
    const login = await Axios.post("login.php", {
      email: user.email,
      password: user.password,
    });
    return login.data;
  };

  // Checking user logged in or not
  const isLoggedIn = async () => {
    const loginToken = localStorage.getItem("loginToken");

    // If inside the local-storage has the JWT token
    if (loginToken) {
      //Adding JWT token to axios default header
      Axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;

      // Fetching the user information
      const { data } = await Axios.get("user-info.php");

      // If user information is successfully received
      if (data.success && data.user) {
        setIsAuth(true);
        setTheUser(data.user);
      } else {
        console.log("not successful");
      }
    }
  };

  const getData = useCallback(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotesData(data);
      });
  }, []);

  const deleteNote = (noteId) => {
    fetch("http://localhost:8000/notes/" + noteId, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const motifs = [
    ["monochrome", grey[100], "#fff", "#000000DE"],
    ["red", red[100], red[50], red[600]],
    ["orange", orange[100], orange[50], orange[600]],
    ["yellow", yellow[100], yellow[50], yellow[700]],
    ["green", green[100], green[50], green[600]],
    ["blue", blue[100], blue[50], blue[600]],
    ["violet", purple[100], purple[50], purple[600]],
    ["pink", pink[100], pink[50], pink[600]],
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppContext.Provider
          value={{
            notesData,
            getData,
            deleteNote,
            showThemes,
            setShowThemes,
            motifs,
            setEditedTheme,
            editedTheme,
            //login register
            isAuth,
            setIsAuth,
            theUser,
            setTheUser,
            loginUser,
            logoutUser,
            registerUser,
            isLoggedIn,
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/note/:id" element={<NoteDetails />} />
            </Routes>
          </Router>
        </AppContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
