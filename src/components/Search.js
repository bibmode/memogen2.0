import { InputBase } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { AppContext } from "../App";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  img: {
    width: 18,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flexGrow: 1,
  marginLeft: 0,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  border: "1.5px solid #bdbdbd",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "50%",
    transform: "translateX(-50%)",
    width: "70%",
  },
}));

const Search = () => {
  const { searchMemos } = useContext(AppContext);

  const handleSearchInput = (e) => {
    searchMemos(e.target.value);
  };
  return (
    <Wrapper>
      <SearchIconWrapper>
        <img src="images/🔍.svg" alt="search icon" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search notes…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleSearchInput}
      />
    </Wrapper>
  );
};

export default Search;
