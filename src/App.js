import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createContext, useCallback, useState } from "react";
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 806,
      lg: 1200,
      xl: 1536,
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
  const [signInToggle, setSignInToggle] = useState(true);

  //log in

  // Root State
  const [isAuth, setIsAuth] = useState(false);
  const [theUser, setTheUser] = useState(null);

  // On Click the Log out button
  const logoutUser = () => {
    localStorage.removeItem("loginToken");
    setIsAuth(false);
  };

  const switchForm = () => {
    setSignInToggle(!signInToggle);
  };

  const registerUser = async (user) => {
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

  // Memos functions
  const getMemos = useCallback((userId) => {
    let formData = new FormData();
    formData.append("id", userId);
    axios
      .get(
        `http://localhost/memogen-backend/user-memos.php?id=${userId}`,
        formData
      )
      .then((res) => {
        res.data[0] ? setNotesData(res.data) : setNotesData(null);
      });
  }, []);

  const searchMemos = (searchInput) => {
    axios
      .get(
        `http://localhost/memogen-backend/memo-search.php?id=${theUser.id}&search=${searchInput}`
      )
      .then((res) => {
        if (res.data[0]) setNotesData(res.data);
      });
  };

  const updateMemo = (updateData) => {
    axios.put("http://localhost/memogen-backend/memo-update.php", updateData);
  };

  const insertMemo = (newData) => {
    axios
      .post("http://localhost/memogen-backend/memo-insert.php", newData)
      .then((res) => {
        if (res.data[0]) setNotesData(res.data);
      });
  };

  const deleteMemo = (memoId) => {
    axios.delete("http://localhost/memogen-backend/memo-delete.php", {
      data: { id: memoId },
    });
  };

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

  //Todos functions
  const [toggleMemoTodo, setToggleMemoTodo] = useState(true);
  const [todosData, setTodosData] = useState(null); //true for memo, false for todo
  const [completedTodos, setCompletedTodos] = useState(null);
  const [activeTodos, setActiveTodos] = useState(null);
  const [toggleAddTodo, setToggleAddTodo] = useState(false);

  const getTodos = useCallback((userId) => {
    let formData = new FormData();
    formData.append("id", userId);
    axios
      .get(
        `http://localhost/memogen-backend/user-todos.php?id=${userId}`,
        formData
      )
      .then((res) => {
        res.data[0] ? setTodosData(res.data) : setTodosData(null);
      });
  }, []);

  const updateTodo = (updateData) => {
    axios
      .put("http://localhost/memogen-backend/todo-update.php", updateData)
      .then((res) => {
        getTodos(Number(theUser.id));
      });
  };

  const deleteTodo = (todoId) => {
    axios
      .delete("http://localhost/memogen-backend/todo-delete.php", {
        data: { id: todoId },
      })
      .then((res) => {
        getTodos(Number(theUser.id));
      });
  };

  const insertTodo = (newData) => {
    axios
      .post("http://localhost/memogen-backend/todo-insert.php", newData)
      .then((res) => {
        if (res.data[0]) setTodosData(res.data);
      });
  };

  const handleCheckbox = (todo) => {
    const todo_id = Number(todo.todo_id);
    const user_id = Number(todo.user_id);
    const content = todo.content;
    const status = todo.status === "active" ? "completed" : "active";
    const entry = {
      todo_id,
      user_id,
      content,
      status,
    };
    updateTodo(entry);
  };

  const getActives = () => {
    const actives = todosData
      ? todosData.filter((todo) => todo.status === "active")
      : null;
    setActiveTodos(actives);
  };

  const getCompleted = () => {
    const completed = todosData
      ? todosData.filter((todo) => todo.status === "completed")
      : null;
    setCompletedTodos(completed);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppContext.Provider
          value={{
            notesData,
            setNotesData,
            // getData,
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
            signInToggle,
            setSignInToggle,
            switchForm,
            toggleMemoTodo,
            setToggleMemoTodo,
            //memos
            getMemos,
            updateMemo,
            insertMemo,
            deleteMemo,
            searchMemos,
            //todos
            todosData,
            setTodosData,
            getTodos,
            completedTodos,
            setCompletedTodos,
            updateTodo,
            deleteTodo,
            insertTodo,
            handleCheckbox,
            activeTodos,
            setActiveTodos,
            getActives,
            getCompleted,
            toggleAddTodo,
            setToggleAddTodo,
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
