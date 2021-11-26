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
}));

const CompletedTodos = () => {
  const { completedTodos } = useContext(AppContext);

  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
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
          Completed
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
    </>
  );
};

export default CompletedTodos;
