import Lottie from "react-lottie";
import styled from "styled-components";
import lottieJson from "src/assets/spinner.json";

export default function Spinner() {
  return (
    <Container>
      <Lottie
        options={{ loop: true, autoplay: true, animationData: lottieJson }}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  width: 5em;
`;
