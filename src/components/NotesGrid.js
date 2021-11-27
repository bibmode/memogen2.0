import { Card, Grid, IconButton, Tooltip } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import CustomIcon from "./CustomIcon";
import EmptyMsg from "./EmptyMsg";

const Note = styled(Card)((props) => ({
  padding: 30,
  textAlign: "left",
  maxHeight: "180px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: props.backgroundColor,
  "#title": {
    fontWeight: "500",
    textTransform: "capitalize",
    cursor: "pointer",
    color: props.textColor,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  p: {
    flex: 1,
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    color: props.textColor,
    marginBottom: 5,
  },
}));

const NoteFooter = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const DeleteBtn = styled(IconButton)(() => ({
  img: {
    height: 16,
  },
}));

const NotesGrid = () => {
  const { notesData, motifs, deleteMemo, theUser, getMemos, setUserError } =
    useContext(AppContext);

  const getBackground = (theme) => {
    const background = motifs.filter((motif) => motif[0] === theme);
    return `${background[0][2]} !important`;
  };

  const getText = (theme) => {
    const background = motifs.filter((motif) => motif[0] === theme);
    return `${background[0][3]} !important`;
  };

  const handleDelete = (id) => {
    if (Number(theUser.id) === 8) {
      setUserError(true);
    } else {
      deleteMemo(id);
      getMemos(Number(theUser.id));
    }
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {notesData &&
          notesData.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Note
                backgroundColor={getBackground(note.motif)}
                textColor={getText(note.motif)}
              >
                <Link id="title" to={`/note/${note.memo_id}`}>
                  {note.title}
                </Link>
                <p id="content">
                  {parse(
                    note.content
                      .replace(/<div>/g, "")
                      .replace(/<\/div>/g, "<br>")
                  )}
                </p>
                <NoteFooter>
                  <p>{note.date}</p>
                  <Tooltip title="Delete">
                    <DeleteBtn onClick={() => handleDelete(note.memo_id)}>
                      <CustomIcon
                        id="icon"
                        path="/images/🗑️.svg"
                        altName="bin icon"
                      />
                    </DeleteBtn>
                  </Tooltip>
                </NoteFooter>
              </Note>
            </Grid>
          ))}
      </Grid>
      {!notesData && <EmptyMsg type="note" />}
    </Box>
  );
};

export default NotesGrid;
