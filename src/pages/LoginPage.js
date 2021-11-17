import { Container, Grid, Typography } from "@mui/material";
import { amber } from "@mui/material/colors";
import { styled } from "@mui/system";
import LoginForm from "../components/LoginForm";
import Quote from "../components/Quote";

const Background = styled("div")(({ theme }) => ({
  backgroundColor: amber[50],
  minHeight: "100vh",
}));

const Wrapper = styled(Container)(({ theme }) => ({
  paddingBlock: theme.spacing(3),
  "#quoteContainer": {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  "#formContainer": {
    [theme.breakpoints.down("md")]: {
      marginTop: "5rem",
    },
  },
}));

const LoginPage = () => {
  return (
    <Background>
      <Wrapper>
        <Typography fontSize="24px" fontWeight="fontWeightBold">
          💡 memogen
        </Typography>
        <Grid container alignItems="center">
          <Grid id="quoteContainer" item xs={0} md={7}>
            <Quote />
          </Grid>
          <Grid id="formContainer" item xs={12} md={5}>
            <LoginForm />
          </Grid>
        </Grid>
      </Wrapper>
    </Background>
  );
};

export default LoginPage;
