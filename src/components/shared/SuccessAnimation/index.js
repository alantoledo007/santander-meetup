import Lottie from "react-lottie";
import styled from "styled-components";
import lottieJson from "src/assets/success.json";
import { Button, Typography } from "@material-ui/core";

export default function SuccessAnimation({ onClick, message }) {
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
          loop: false,
          animationData: lottieJson,
        }}
      />

      <Button
        size="large"
        variant={"contained"}
        onClick={onClick}
        fullWidth
        color="primary"
      >
        Aceptar
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 40em;
  margin: auto;
  place-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
  box-sizing: border-box;
`;
