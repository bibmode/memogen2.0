import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../App";

import LooksIcon from "@mui/icons-material/Looks";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFormik } from "formik";
import NoteForm from "../components/NoteForm";
import EditableFields from "../components/EditableFields";
import HomeButton from "../components/HomeButton";

const Wrapper = styled("div")((props) => ({
  height: "100vh",
  boxSizing: "border-box",
  paddingBlock: 50,
  color: "#000000",
  overflowX: "hidden",
  backgroundColor: props.background,
}));

const Containment = styled(Container)(({ theme }) => ({
  position: "relative",
  height: "100%",
}));

const NoteDetails = () => {
  const { id } = useParams();
  const { notesData, motifs, editedTheme, setEditedTheme } =
    useContext(AppContext);

  const actions = [
    { icon: <ContentCopyIcon />, name: "Copy" },
    { icon: <LooksIcon />, name: "Themes" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const [currentNote, setCurrentNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState(null);
  const [editedContent, setEditedContent] = useState(null);

  const [titleColor, setTitleColor] = useState(null);
  const [contentColor, setContentColor] = useState(null);
  const [background, setBackground] = useState("#fff");

  //to regain the notes original theme after save if the theme is not changed
  useEffect(() => {
    if (currentNote) setEditedTheme(currentNote[0].motif);
  }, [currentNote]);

  useEffect(() => {
    if (notesData) {
      setCurrentNote(notesData.filter((note) => note.id === Number(id)));
    }
  }, [notesData, id]);

  const formik = useFormik({
    initialValues: {
      title: currentNote && currentNote[0].title,
      content: currentNote && currentNote[0].content,
      motif: currentNote && currentNote[0].motif,
    },
    onSubmit: () => {
      const title = editedTitle !== "" ? editedTitle : currentNote[0].title;
      const content =
        editedContent !== "" ? editedContent : currentNote[0].content;
      const today = new Date();
      const date = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
      const motif = editedTheme ? editedTheme : currentNote[0].motif;

      const entry = {
        title,
        content,
        motif,
        date,
      };

      fetch("http://localhost:8000/notes/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    },
  });

  const gettingTheme = (themeToUse = null) => {
    if (notesData && currentNote) {
      let currentMotif;
      if (!themeToUse) {
        currentMotif = motifs.filter(
          (motif) => motif[0] === currentNote[0].motif
        );
      } else {
        currentMotif = motifs.filter((motif) => motif[0] === themeToUse);
      }
      setBackground(currentMotif[0][2]);
      setTitleColor(currentMotif[0][3]);
      setContentColor(currentMotif[0][3]);
    }
  };

  useEffect(() => {
    gettingTheme();
  }, [currentNote]);

  useEffect(() => {
    gettingTheme(editedTheme);
  }, [editedTheme]);

  return (
    <>
      {currentNote && (
        <Wrapper background={background}>
          <Containment id="container">
            <HomeButton />

            <EditableFields
              editTitle={(e) => setEditedTitle(e.target.innerHTML)}
              editContent={(e) => setEditedContent(e.target.innerHTML)}
              currentNote={currentNote}
              background={background}
              initialValues={[formik.values.title, formik.values.content]}
              titleColor={titleColor}
              contentColor={contentColor}
            />

            <NoteForm
              actions={actions}
              handleSubmit={() => formik.handleSubmit()}
              noteTitle={editedTitle}
              noteContent={editedContent}
              noteId={id}
            />
          </Containment>
        </Wrapper>
      )}
    </>
  );
};

export default NoteDetails;
