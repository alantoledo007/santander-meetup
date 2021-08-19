import Header from "src/components/Header";
import { Container } from "@material-ui/core";

export default function AppLayout({ children }) {
  return (
    <>
      <Header auth isAdmin current={"home"} />
      <Container component="main" maxWidth="md">
        {children}
      </Container>
    </>
  );
}
