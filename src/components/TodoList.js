import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";
import CompletedTodos from "./CompletedTodos";
import TodoBar from "./TodoBar";

const TodoList = () => {
  const { activeTodos } = useContext(AppContext);

  return (
    <Box>
      <Container disableGutters={true} maxWidth="md">
        {/* active todos */}
        {activeTodos &&
          activeTodos.map((todo) => (
            <TodoBar
              checked={false}
              index={Number(todo.todo_id)}
              label={todo.content}
              todo={todo}
            />
          ))}

        <CompletedTodos />
      </Container>
    </Box>
  );
};

export default TodoList;
