import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";
import CustomIcon from "./CustomIcon";

const Wrapper = styled(Paper)(({ theme, color }) => ({
  paddingInline: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: "left",
  backgroundColor: color,
  display: "flex",
  justifyContent: "space-between",
}));

const CheckboxLabel = styled(FormControlLabel)((props) => ({
  textDecoration: props.done,
  color: props.color,
  maxWidth: 720,
  overflowWrap: "break-all",
  wordBreak: "break-word",
  hyphens: "auto",
}));

const TodoBar = ({ index, label, todo, checked }) => {
  const { handleCheckbox, deleteTodo } = useContext(AppContext);

  return (
    <Wrapper elevation={0} key={index} color={checked ? grey[50] : "#fff"}>
      <CheckboxLabel
        label={label}
        done={checked ? "line-through" : "none"}
        color={checked ? grey[400] : "inherit"}
        control={
          <Checkbox checked={checked} onChange={() => handleCheckbox(todo)} />
        }
      />
      {checked && (
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteTodo(index)}>
            <CustomIcon path="/images/🗑️.svg" altName="delete" />
          </IconButton>
        </Tooltip>
      )}
    </Wrapper>
  );
};

export default TodoBar;
