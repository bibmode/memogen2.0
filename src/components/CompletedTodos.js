import { Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";
import TodoBar from "./TodoBar";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Toggle = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  "& > *": {
    textTransform: "capitalize !important",
  },
}));

const DeleteBtn = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  float: "right",
}));

const CompletedTodos = () => {
  const {
    completedTodos,
    bulkDeleteTodos,
    toggleCompleted,
    setToggleCompleted,
    theUser,
    setUserError,
  } = useContext(AppContext);

  const handleClick = () => {
    setToggleCompleted(!toggleCompleted);
  };

  const deleteAll = () => {
    if (Number(theUser.id) === 8) {
      setUserError(true);
      return;
    }
    const completedIds = completedTodos.map((todo) => Number(todo.todo_id));
    bulkDeleteTodos(completedIds);
  };

  return (
    <>
      <Toggle>
        <Button
          color={"inherit"}
          size="small"
          startIcon={!toggleCompleted ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          onClick={handleClick}
        >
          Completed {completedTodos.length}
        </Button>
      </Toggle>
      {completedTodos &&
        toggleCompleted &&
        completedTodos.map((todo) => (
          <TodoBar
            checked={true}
            index={Number(todo.todo_id)}
            label={todo.content}
            todo={todo}
          />
        ))}
      {completedTodos.length > 0 && toggleCompleted && (
        <DeleteBtn
          variant="contained"
          size="small"
          disableElevation
          onClick={deleteAll}
        >
          Delete all
        </DeleteBtn>
      )}
    </>
  );
};

export default CompletedTodos;
