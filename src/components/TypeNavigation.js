import { Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),
}));

const TypeNavigation = () => {
  return (
    <Wrapper>
      <Breadcrumbs>
        <Typography color="text.primary" variant="subtitle2" underline="hover">
          Notes
        </Typography>
        <Typography color="inherit" variant="subtitle2" underline="hover">
          To-dos
        </Typography>
      </Breadcrumbs>
    </Wrapper>
  );
};

export default TypeNavigation;
