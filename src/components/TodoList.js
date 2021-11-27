import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";
import CompletedTodos from "./CompletedTodos";
import EmptyMsg from "./EmptyMsg";
import TodoBar from "./TodoBar";

const TodoList = () => {
  const { activeTodos, todosData, completedTodos } = useContext(AppContext);

  return (
    <Box>
      {todosData && (
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

          {completedTodos && <CompletedTodos />}
        </Container>
      )}

      {!todosData && <EmptyMsg type="task" />}
    </Box>
  );
};

export default TodoList;
