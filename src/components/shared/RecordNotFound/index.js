import Lottie from "react-lottie";
import styled from "styled-components";
import lottieJson from "src/assets/record404.json";
import { Typography } from "@material-ui/core";

export default function RecordNotFound({ message }) {
  return (
    <Container>
      {message && (
        <Typography variant={"h3"} align="center">
          {message}
        </Typography>
      )}
      <Lottie
        options={{
          autoplay: true,
          loop: true,
          animationData: lottieJson,
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  place-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
`;
