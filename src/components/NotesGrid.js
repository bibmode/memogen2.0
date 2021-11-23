import { Card, Grid } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

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
  },
}));

const NotesGrid = () => {
  const { notesData, motifs } = useContext(AppContext);

  const getBackground = (theme) => {
    const background = motifs.filter((motif) => motif[0] === theme);
    return `${background[0][2]} !important`;
  };

  const getText = (theme) => {
    const background = motifs.filter((motif) => motif[0] === theme);
    return `${background[0][3]} !important`;
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
                <p>{note.date}</p>
              </Note>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default NotesGrid;
