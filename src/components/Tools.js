import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";

// import LooksIcon from "@mui/icons-material/Looks";
// import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router";
import CustomIcon from "./CustomIcon";

const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "flex-end",
}));

const Tools = ({ noteId }) => {
  const navigate = useNavigate();

  const { showThemes, setShowThemes, deleteMemo, theUser, setUserError } =
    useContext(AppContext);

  const deleteNote = () => {
    if (Number(theUser.id) !== 8) {
      if (noteId) deleteMemo(noteId);
      navigate("/home");
    } else {
      setUserError(true);
    }
  };

  const openMotifs = () => {
    setShowThemes(!showThemes);
  };

  return (
    <Wrapper>
      <Tooltip title="Theme">
        <IconButton onClick={openMotifs}>
          <CustomIcon path="/images/🌈.svg" altName="rainbow icon" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={deleteNote}>
          <CustomIcon path="/images/🗑️.svg" altName="bin icon" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy">
        <IconButton>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default Tools;
