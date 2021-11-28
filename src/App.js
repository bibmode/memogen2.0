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
import CustomAlert from "./pages/CustomAlert";
import { AnimatePresence } from "framer-motion";

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
  const [userError, setUserError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [registerError, setRegisterError] = useState(false);

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

  const getNewUserId = (email) => {
    axios
      .get(`http://localhost/memogen-backend/user-id.php?email=${email}`)
      .then((res) => {
        setDefaultData(res.data[0].id);
      });
  };

  const setDefaultData = (id) => {
    const today = new Date();

    const defaultNotes = [
      {
        title: "Playground 1",
        content:
          "You can change the theme, title, and content to your heart's content! :D",
        date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
        motif: "blue",
        user: Number(id),
      },
      {
        title: "Playground 2",
        content: "Write whatever you want :D!",
        date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
        motif: "yellow",
        user: Number(id),
      },
      {
        title: "Playground 3",
        content: "You can delete notes now that you're a user! ",
        date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
        motif: "red",
        user: Number(id),
      },
    ];

    const defaultTasks = [
      {
        content: "Welcome to memogen to-dos!",
        status: "active",
        user: Number(id),
      },
      {
        content: "You can create a new task by clicking the pencil button",
        status: "active",
        user: Number(id),
      },
      {
        content: "Check any task box when completed",
        status: "active",
        user: Number(id),
      },
      {
        content: "You can delete an individual task",
        status: "completed",
        user: Number(id),
      },
      {
        content: "You can even delete all completed tasks",
        status: "completed",
        user: Number(id),
      },
    ];

    defaultNotes.forEach((note) => {
      insertMemo(note);
    });

    defaultTasks.forEach((task) => {
      insertTodo(task);
    });
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
        setToggleMemoTodo(true);
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
  const [searchOn, setSearchOn] = useState(false);
  const [toggleCompleted, setToggleCompleted] = useState(false);

  const getActives = useCallback(() => {
    const actives = todosData
      ? todosData.filter((todo) => todo.status === "active")
      : null;
    setActiveTodos(actives);
  }, [todosData]);

  const getCompleted = useCallback(() => {
    const completed = todosData
      ? todosData.filter((todo) => todo.status === "completed")
      : null;
    setCompletedTodos(completed);
  }, [todosData]);

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

  const bulkDeleteTodos = (todosArr) => {
    todosArr.forEach((todo) => {
      axios.delete("http://localhost/memogen-backend/todo-delete.php", {
        data: { id: todo },
      });
    });
    getTodos(Number(theUser.id));
  };

  const insertTodo = (newData) => {
    axios
      .post("http://localhost/memogen-backend/todo-insert.php", newData)
      .then((res) => {
        if (res.data[0]) setTodosData(res.data);
      });
  };

  const searchTodos = (searchInput) => {
    if (searchInput.trim() !== "") {
      setSearchOn(true);
      axios
        .get(
          `http://localhost/memogen-backend/todo-search.php?id=${theUser.id}&search=${searchInput}`
        )
        .then((res) => {
          if (res.data[0]) {
            setTodosData(res.data);
            const todosFound = res.data;
            const actives = todosFound.filter(
              (todo) => todo.status === "active"
            );
            const completes = todosFound.filter(
              (todo) => todo.status === "completed"
            );
            setCompletedTodos(completes);
            setActiveTodos(actives);
            if (completes.length) setToggleCompleted(true);
            else setToggleCompleted(false);
          } else setSearchOn(false);
        });
    } else setSearchOn(false);
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

  useEffect(() => {
    if (userError) {
      setTimeout(() => {
        setUserError(false);
      }, 3000);
    }
  }, [userError]);

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
    }
  }, [successMsg]);

  useEffect(() => {
    if (saveError) {
      setTimeout(() => {
        setSaveError(false);
      }, 3000);
    }
  }, [saveError]);

  useEffect(() => {
    if (successRegister) {
      setTimeout(() => {
        setSuccessRegister(false);
      }, 3000);
    }
  }, [successRegister]);

  useEffect(() => {
    if (registerError) {
      setTimeout(() => {
        setRegisterError(false);
      }, 3000);
    }
  }, [registerError]);

  useEffect(() => {
    if (noteDeleted) {
      setTimeout(() => {
        setNoteDeleted(false);
      }, 3000);
    }
  }, [noteDeleted]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AnimatePresence exitBeforeEnter>
          {registerError && (
            <CustomAlert
              severity="error"
              message="Enter valid email and password!"
            />
          )}
        </AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          {successRegister && (
            <CustomAlert
              severity="success"
              message="You successfully registered!"
            />
          )}
        </AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          {userError && (
            <CustomAlert
              severity="error"
              message="Create an account to access this feature and more!"
            />
          )}
        </AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          {successMsg && (
            <CustomAlert severity="success" message="Note saved!" />
          )}
          {saveError && (
            <CustomAlert
              severity="warning"
              message="Set the title and content!"
            />
          )}
        </AnimatePresence>

        <AnimatePresence exitBeforeEnter>
          {noteDeleted && (
            <CustomAlert
              severity="success"
              message="Note successfully deleted!"
            />
          )}
        </AnimatePresence>

        <AppContext.Provider
          value={{
            userError,
            setUserError,
            successMsg,
            setSuccessMsg,
            noteDeleted,
            setNoteDeleted,
            successRegister,
            setSuccessRegister,
            registerError,
            setRegisterError,
            saveError,
            setSaveError,
            notesData,
            setNotesData,
            setDefaultData,
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
            getNewUserId,
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
            bulkDeleteTodos,
            insertTodo,
            handleCheckbox,
            activeTodos,
            setActiveTodos,
            getActives,
            getCompleted,
            toggleAddTodo,
            setToggleAddTodo,
            searchTodos,
            setSearchOn,
            searchOn,
            toggleCompleted,
            setToggleCompleted,
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
