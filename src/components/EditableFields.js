import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import parse from "html-react-parser";
import ThemesBar from "./ThemesBar";
import { useContext } from "react";
import { AppContext } from "../App";
import Tools from "./Tools";

const Title = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  ":focus": {
    outline: "none",
    border: "none",
  },
  color: (props) => props.color,
}));

const TitleToolWrap = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const Content = styled(Typography)(({ theme }) => ({
  color: (props) => props.color,
  textAlign: "left",
  fontSize: "18px",
  minHeight: "63vh",
  outline: "none",
  border: "none",
  width: "100%",
  paddingBlock: theme.spacing(3),
  ":focus": {
    outline: "none",
    border: "none",
  },
}));

const EditableFields = ({
  editTitle,
  editContent,
  currentNote,
  initialValues,
  titleColor,
  contentColor,
}) => {
  const { showThemes } = useContext(AppContext);

  return (
    <>
      <TitleToolWrap>
        <Title
          variant="h4"
          fontWeight="medium"
          textAlign="left"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={editTitle}
          color={titleColor}
        >
          {currentNote ? currentNote[0].title : initialValues[0]}
        </Title>
        <Tools noteId={currentNote ? currentNote[0].memo_id : null} />
      </TitleToolWrap>

      {showThemes && <ThemesBar />}
      <Content
        role="textarea"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={editContent}
        color={contentColor}
      >
        {currentNote
          ? parse(currentNote[0].content)
          : parse(`${initialValues[1]}`)}
      </Content>
    </>
  );
};

export default EditableFields;
