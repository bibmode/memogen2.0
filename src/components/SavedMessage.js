import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: grey[100],
  position: "absolute",
  left: "50%",
  top: "1rem",
  transform: "translateX(-50%)",
  paddingBlock: theme.spacing(1),
  paddingInline: theme.spacing(2),
}));

const SavedMessage = () => {
  return <Wrapper>Note Saved</Wrapper>;
};

export default SavedMessage;
