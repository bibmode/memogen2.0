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

const theme = createTheme({
  palette: {
    primary: {
      main: yellow["A700"],
    },
  },
});

export const AppContext = createContext(null);

function App() {
  const [notesData, setNotesData] = useState(null);
  const [showThemes, setShowThemes] = useState(false);
  const [editedTheme, setEditedTheme] = useState("monochrome");

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
