import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { SpeedDial, SpeedDialAction } from "@mui/material";

import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router";

const ToolsSpeedDial = ({ actions, noteId }) => {
  const navigate = useNavigate();
  const { deleteNote, setShowThemes, showThemes } = useContext(AppContext);

  const getActionType = (el) => {
    if (el === "Delete") {
      deleteNote(noteId);
      navigate("/home");
    }
    if (el === "Themes") {
      setShowThemes(!showThemes);
    }
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      icon={<SpeedDialIcon />}
      sx={{ mr: 4 }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          onClick={() => {
            getActionType(action.name);
          }}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default ToolsSpeedDial;
