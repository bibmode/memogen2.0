import { Alert } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

//animations
const alertVariants = {
  hidden: {
    opacity: 0,
    y: "-5rem",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-5rem",
    transition: {
      duration: 0.2,
      type: "spring",
    },
  },
};

const Wrapper = styled(Alert)(() => ({
  position: "absolute",
  width: "100%",
  top: 0,
}));

const CustomAlert = ({ severity, message }) => {
  return (
    <Wrapper
      component={motion.div}
      variants={alertVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      severity={severity}
    >
      {message}
    </Wrapper>
  );
};

export default CustomAlert;
