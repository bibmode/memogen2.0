import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";

import LooksIcon from "@mui/icons-material/Looks";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router";

const Wrapper = styled("div")((props) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "flex-end",
}));

const Tools = ({ noteId }) => {
  const navigate = useNavigate();

  const { showThemes, setShowThemes, deleteMemo } = useContext(AppContext);
  const deleteNote = () => {
    if (noteId) deleteMemo(noteId);
    navigate("/home");
  };

  const openMotifs = () => {
    setShowThemes(!showThemes);
  };

  return (
    <Wrapper>
      <Tooltip title="Theme">
        <IconButton onClick={openMotifs}>
          <LooksIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={deleteNote}>
          <DeleteIcon />
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
