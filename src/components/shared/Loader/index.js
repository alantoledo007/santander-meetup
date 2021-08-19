import Lottie from "react-lottie";
import styled from "styled-components";
import lottieJson from "src/assets/loader.json";

export default function Loader() {
  return (
    <Container>
      <Lottie
        options={{ loop: true, autoplay: true, animationData: lottieJson }}
      />
    </Container>
  );
}

const Container = styled.div`
  place-items: center;
  width: 100vw;
  height: 100vh;
`;
