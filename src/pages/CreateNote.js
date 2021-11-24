import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";

import LooksIcon from "@mui/icons-material/Looks";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFormik } from "formik";
import NoteForm from "../components/NoteForm";
import EditableFields from "../components/EditableFields";
import HomeButton from "../components/HomeButton";
import { AppContext } from "../App";
import SavedMessage from "../components/SavedMessage";
import { useNavigate } from "react-router";

const Wrapper = styled("div")((props) => ({
  height: "100vh",
  boxSizing: "border-box",
  paddingBlock: 50,
  color: "#000000",
  overflowX: "hidden",
  backgroundColor: props.background,
}));

const Containment = styled(Container)(() => ({
  position: "relative",
  height: "100%",
}));

const CreateNote = () => {
  const {
    editedTheme,
    motifs,
    setEditedTheme,
    insertMemo,
    theUser,
    notesData,
    setNotesData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const nullifyNotes = useCallback(() => {
    setNotesData(null);
  }, [setNotesData]);

  useEffect(() => {
    nullifyNotes();
  }, [nullifyNotes]);

  const actions = [
    { icon: <ContentCopyIcon />, name: "Copy" },
    { icon: <LooksIcon />, name: "Themes" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const [titleColor, setTitleColor] = useState(null);
  const [contentColor, setContentColor] = useState(null);
  const [background, setBackground] = useState("#fff");
  const [showSaved, setShowSaved] = useState(false);

  const [editedTitle, setEditedTitle] = useState(null);
  const [editedContent, setEditedContent] = useState(null);

  const getEditedTheme = useCallback(() => {
    setEditedTheme("monochrome");
  }, [setEditedTheme]);

  useEffect(() => {
    getEditedTheme();
  }, [getEditedTheme]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: () => {
      const title = editedTitle;
      const content = editedContent;
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      const motif = editedTheme;
      const user = Number(theUser.id);
      const entry = {
        title,
        content,
        motif,
        date,
        user,
      };
      if (title !== null || content !== null) {
        insertMemo(entry);
        setShowSaved(true);
      } else {
        alert("Fill the content and title before saving!");
      }
    },
  });

  const goToNewMemo = useCallback(() => {
    const memoId = notesData[notesData.length - 1].memo_id;
    navigate(`/note/${memoId}`, { replace: true });
  }, [navigate, notesData]);

  useEffect(() => {
    if (showSaved && notesData) {
      goToNewMemo();
    }
  }, [notesData, goToNewMemo, showSaved]);

  useEffect(() => {
    setTimeout(() => {
      setShowSaved(false);
    }, 3000);
  }, [showSaved]);

  const gettingTheme = useCallback(() => {
    let currentMotif = motifs.filter((motif) => motif[0] === editedTheme);
    setBackground(currentMotif[0][2]);
    setTitleColor(currentMotif[0][3]);
    setContentColor(currentMotif[0][3]);
  }, [setBackground, setTitleColor, setContentColor, editedTheme, motifs]);

  useEffect(() => {
    gettingTheme();
  }, [editedTheme, gettingTheme]);

  return (
    <Wrapper background={background}>
      {showSaved && <SavedMessage />}
      <Containment id="container">
        <HomeButton label="Cancel" />

        <EditableFields
          editTitle={(e) => setEditedTitle(e.target.innerHTML)}
          editContent={(e) => setEditedContent(e.target.innerHTML)}
          currentNote={false}
          initialValues={["Add Title", "Write Content..."]}
          titleColor={titleColor}
          contentColor={contentColor}
        />

        <NoteForm
          actions={actions}
          handleSubmit={() => formik.handleSubmit()}
          noteTitle={editedTitle}
          noteContent={editedContent}
        />
      </Containment>
    </Wrapper>
  );
};

export default CreateNote;
