import { Button } from "@mui/material";
import { styled } from "@mui/system";
import ToolsSpeedDial from "./ToolsSpeedDial";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "56px",
  display: "flex",
  alignItems: "flex-end",
  position: "sticky",
  bottom: 0,
  paddingTop: "40px",

  zIndex: 5,
  form: {
    flex: 1,
  },
}));

const NoteForm = ({
  actions,
  handleSubmit,
  noteTitle,
  noteContent,
  noteId,
}) => {
  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input id="title" type="hidden" name="title" value={noteTitle} />
        <input id="content" type="hidden" name="content" value={noteContent} />
        <Button variant="contained" type="submit" id="saveBtn" disableElevation>
          Save
        </Button>
      </form>

      <ToolsSpeedDial actions={actions} noteId={noteId} />
    </Container>
  );
};

export default NoteForm;
