import styled from "styled-components";
import Lottie from "react-lottie";
import lottieJson from "src/assets/page404.json";
import { Box, Button, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { ROUTER_PATHS } from "src/core/constants";

export default function Error404({ isAdmin }) {
  return (
    <Wrapper>
      <Container>
        <Box mb={3}>
          <Typography variant="h3">Santander Meetup</Typography>
        </Box>
        <Button
          component={RouterLink}
          to={isAdmin ? ROUTER_PATHS.admin_meetups : "/"}
          variant="outlined"
        >
          {isAdmin ? "Ir al panel" : "Ir al inicio"}
        </Button>
        <Lottie
          options={{ loop: true, autoplay: true, animationData: lottieJson }}
        />
        <Typography
          variant="subtitle1"
          component="strong"
          color="textSecondary"
        >
          Página no encontrada
        </Typography>
      </Container>
    </Wrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 5em;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
