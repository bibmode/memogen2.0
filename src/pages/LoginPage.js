import { Container, Grid, Typography } from "@mui/material";
import { amber } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";
import LoginForm from "../components/LoginForm";
import Quote from "../components/Quote";
import RegisterForm from "../components/RegisterForm";

const Background = styled("div")(() => ({
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

const PageTitle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  img: {
    paddingRight: theme.spacing(1),
  },
}));

const LoginPage = () => {
  const { signInToggle } = useContext(AppContext);

  return (
    <Background>
      <Wrapper>
        <PageTitle>
          <img src="images/💡.svg" alt="light bulb" />
          <Typography fontSize="24px" fontWeight="fontWeightBold">
            memogen
          </Typography>
        </PageTitle>

        <Grid container alignItems="center">
          <Grid id="quoteContainer" item xs={0} md={7}>
            <Quote />
          </Grid>
          <Grid id="formContainer" item xs={12} md={5}>
            {signInToggle ? <LoginForm /> : <RegisterForm />}
          </Grid>
        </Grid>
      </Wrapper>
    </Background>
  );
};

export default LoginPage;
