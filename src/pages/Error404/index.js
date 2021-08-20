import AppLayout from "src/layouts/AppLayout";
import styled from "styled-components";
import Lottie from "react-lottie";
import lottieJson from "src/assets/page404.json";

export default function Error404() {
  return (
    <AppLayout>
      <Container>
        <Lottie
          options={{ loop: true, autoplay: true, animationData: lottieJson }}
        />
      </Container>
    </AppLayout>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;
