import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../App";

import { useFormik } from "formik";
import NoteForm from "../components/NoteForm";
import EditableFields from "../components/EditableFields";
import HomeButton from "../components/HomeButton";
// import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: {
//     scale: 0.5,
//     x: "100vw",
//   },
//   visible: {
//     scale: 1,
//     x: 0,
//     transition: {
//       duration: 0.6,
//       type: "spring",
//     },
//   },
//   exit: {
//     x: "100vw",
//     transition: {
//       duration: 0.8,
//       type: "tween",
//       ease: "backInOut",
//     },
//   },
// };

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

const NoteDetails = () => {
  const { id } = useParams();
  const {
    notesData,
    motifs,
    editedTheme,
    setEditedTheme,
    updateMemo,
    setSuccessMsg,
    setSaveError,
  } = useContext(AppContext);

  const [currentNote, setCurrentNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [showError, setShowError] = useState(false);

  const [titleColor, setTitleColor] = useState(null);
  const [contentColor, setContentColor] = useState(null);
  const [background, setBackground] = useState("#fff");

  //to regain the notes original theme after save if the theme is not changed

  const getEditedTheme = useCallback(() => {
    setEditedTheme(currentNote[0].motif);
  }, [currentNote, setEditedTheme]);

  useEffect(() => {
    if (currentNote) getEditedTheme();
  }, [currentNote, getEditedTheme]);

  useEffect(() => {
    if (notesData) {
      setCurrentNote(notesData.filter((note) => note.memo_id === id));
    }
  }, [notesData, id]);

  const formik = useFormik({
    initialValues: {
      title: currentNote && currentNote[0].title,
      content: currentNote && currentNote[0].content,
      motif: currentNote && currentNote[0].motif,
    },
    onSubmit: () => {
      const title =
        typeof editedTitle === "string" ? editedTitle : currentNote[0].title;
      const content =
        typeof editedContent === "string"
          ? editedContent
          : currentNote[0].content;
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      const motif = editedTheme ? editedTheme : currentNote[0].motif;
      const user_id = Number(currentNote[0].user_id);
      const memo_id = Number(currentNote[0].memo_id);

      const entry = {
        memo_id,
        title,
        content,
        motif,
        date,
        user_id,
      };

      if (title.trim() !== "" && content.trim() !== "") {
        updateMemo(entry);
        setSuccessMsg(true);
      } else {
        setSaveError(true);
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  }, [showError]);

  const gettingTheme = useCallback(
    (themeToUse = null) => {
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
    },
    [
      setBackground,
      setTitleColor,
      setContentColor,
      motifs,
      currentNote,
      notesData,
    ]
  );

  useEffect(() => {
    gettingTheme();
  }, [currentNote, gettingTheme]);

  useEffect(() => {
    gettingTheme(editedTheme);
  }, [editedTheme, gettingTheme]);

  return (
    <>
      {currentNote && (
        <Wrapper background={background}>
          <Containment
            id="container"
            // component={motion.div}
            // variants={containerVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
          >
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
              handleSubmit={() => formik.handleSubmit()}
              noteTitle={editedTitle}
              noteContent={editedContent}
            />
          </Containment>
        </Wrapper>
      )}
    </>
  );
};

export default NoteDetails;
