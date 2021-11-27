import { Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext, useState } from "react";
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

const CompletedTodos = () => {
  const { completedTodos, bulkDeleteTodos } = useContext(AppContext);

  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const deleteAll = () => {
    const completedIds = completedTodos.map((todo) => Number(todo.todo_id));
    console.log(completedIds);
    bulkDeleteTodos(completedIds);
  };

  return (
    <>
      <Toggle>
        <Button
          color={"inherit"}
          size="small"
          startIcon={!toggle ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          onClick={handleClick}
        >
          Completed {completedTodos.length}
        </Button>
      </Toggle>
      {completedTodos &&
        toggle &&
        completedTodos.map((todo) => (
          <TodoBar
            checked={true}
            index={Number(todo.todo_id)}
            label={todo.content}
            todo={todo}
          />
        ))}
      {completedTodos && toggle && <Button onClick={deleteAll}>Delete</Button>}
    </>
  );
};

export default CompletedTodos;
