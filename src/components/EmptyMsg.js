import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const Wrapper = styled("div")(({ theme }) => ({
  float: "right",
  marginRight: theme.spacing(10),
  img: {
    width: 80,
    height: "auto",
    opacity: 0.3,
    marginLeft: "40px",
    transform: "rotate(10deg)",
  },
}));

const EmptyMsg = ({ type }) => {
  return (
    <Wrapper>
      <Typography color={grey[500]}>Add a new {type}</Typography>
      <img src="/images/swirly-arrow.png" alt="swirly arrow" />
    </Wrapper>
  );
};

export default EmptyMsg;
