import { Button, Container, Link, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

//styling
const Form = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#fff",
  paddingBlock: theme.spacing(7),
  paddingBottom: theme.spacing(8),
  paddingInline: theme.spacing(1),
  "& > * > * > *:not(:last-child)": {
    marginBottom: theme.spacing(4),
  },
  "& > * > * > *:last-child": {
    marginBottom: theme.spacing(2),
  },
  "#submitBtn": {
    marginTop: theme.spacing(2),
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(4),
  },
  "#pushpin": {
    width: "5rem",
    position: "absolute",
    right: 15,
    top: -10,
  },
}));

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "test@memogen.com",
      password: "11111111",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate("home", { replace: true });
    },
  });

  return (
    <Form>
      <img id="pushpin" src="images/pushpin.png" alt="pushpin" />
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            id="submitBtn"
            disableElevation
          >
            LOGIN
          </Button>
        </form>
        <Link href="#" underline="hover" color="GrayText">
          No account, yet? REGISTER here!
        </Link>
      </Container>
    </Form>
  );
};

export default LoginForm;
