import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { styled } from "@mui/system";
import * as yup from "yup";
import { useFormik } from "formik";

const Text = styled(DialogContentText)(() => ({
  width: 500,
}));

// form validation
const validationSchema = yup.object({
  content: yup.string().max(55, "Too Long!"),
});

const AddTodoDialog = () => {
  const { toggleAddTodo, setToggleAddTodo, insertTodo, theUser } =
    useContext(AppContext);

  const [charCount, setCharCount] = useState(55);

  const formik = useFormik({
    initialValues: {
      content: "",
      status: "active",
      user: Number(theUser.id),
    },
    validationSchema: validationSchema,
    validateOnChange: true, // this one
    onSubmit: (values) => {
      insertTodo(values);
      handleClose();
    },
  });

  const handleClose = () => {
    formik.resetForm({
      content: "",
      status: "active",
      user: Number(theUser.id),
    });
    setToggleAddTodo(false);
    setCharCount(55);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setCharCount(55 - input.length);
  };

  return (
    <>
      <Dialog open={toggleAddTodo} onClose={handleClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <DialogContent>
            <Text>{charCount} characters left</Text>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              name="content"
              label="New Task"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.content}
              onChange={formik.handleChange}
              onInput={handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" id="submitBtn">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddTodoDialog;
