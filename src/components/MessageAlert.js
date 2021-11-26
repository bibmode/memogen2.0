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

const MessageAlert = ({ message }) => {
  return <Wrapper>{message}</Wrapper>;
};

export default MessageAlert;
