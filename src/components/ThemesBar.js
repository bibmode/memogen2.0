import { Box, styled } from "@mui/system";
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { AppContext } from "../App";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(2),
}));

const Motif = styled("button")((props) => ({
  backgroundColor: props.color,
  width: "100px",
  height: "150px",
  border: "none",
  outline: "none",
  marginRight: 12,
  cursor: "pointer",
  borderRadius: 4,
}));

const ThemesBar = () => {
  const { motifs, setEditedTheme } = useContext(AppContext);

  const checkMotif = (motifArr) => {
    setEditedTheme(motifArr[0]);
  };

  return (
    <Wrapper>
      <Swiper spaceBetween={2} slidesPerView="auto">
        {motifs.map((motif, index) => (
          <SwiperSlide key={index}>
            <Motif
              name={motif[0]}
              color={motif[1]}
              onClick={() => checkMotif(motif)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default ThemesBar;
