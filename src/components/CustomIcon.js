import { Icon } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled(Icon)(() => ({
  textAlign: "center",
  img: {
    height: "85%",
    width: "auto",
  },
}));

const CustomIcon = ({ path, altName }) => {
  return (
    <Wrapper>
      <img src={path} alt={altName} />
    </Wrapper>
  );
};

export default CustomIcon;
