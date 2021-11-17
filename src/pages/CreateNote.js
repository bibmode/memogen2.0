import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";

import LooksIcon from "@mui/icons-material/Looks";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFormik } from "formik";
import NoteForm from "../components/NoteForm";
import EditableFields from "../components/EditableFields";
import HomeButton from "../components/HomeButton";
import { AppContext } from "../App";

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
  const { editedTheme, motifs, setEditedTheme } = useContext(AppContext);
  const actions = [
    { icon: <ContentCopyIcon />, name: "Copy" },
    { icon: <LooksIcon />, name: "Themes" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const [titleColor, setTitleColor] = useState(null);
  const [contentColor, setContentColor] = useState(null);
  const [background, setBackground] = useState("#fff");

  const [editedTitle, setEditedTitle] = useState(null);
  const [editedContent, setEditedContent] = useState(null);

  useEffect(() => {
    setEditedTheme("monochrome");
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: () => {
      const title = editedTitle;
      const content = editedContent;
      const today = new Date();
      const date = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
      const motif = editedTheme;
      const entry = {
        title,
        content,
        motif,
        date,
      };
      if (title !== null || content !== null) {
        fetch("http://localhost:8000/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
      } else {
        alert("Fill the content and title before saving!");
      }
    },
  });

  const gettingTheme = () => {
    let currentMotif = motifs.filter((motif) => motif[0] === editedTheme);
    setBackground(currentMotif[0][2]);
    setTitleColor(currentMotif[0][3]);
    setContentColor(currentMotif[0][3]);
  };

  useEffect(() => {
    gettingTheme();
  }, [editedTheme]);

  return (
    <Wrapper background={background}>
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
