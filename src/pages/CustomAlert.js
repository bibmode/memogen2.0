import { Alert } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled(Alert)(() => ({
  position: "absolute",
  width: "100%",
  top: 0,
}));

const CustomAlert = ({ severity, message }) => {
  return <Wrapper severity={severity}>{message}</Wrapper>;
};

export default CustomAlert;
