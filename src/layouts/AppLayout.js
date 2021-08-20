import Header from "src/components/Header";
import { Container } from "@material-ui/core";
import { logout } from "src/firebase/auth";

export default function AppLayout({ children }) {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header current={"home"} logout={handleLogout} />
      <Container component="main" maxWidth="md">
        {children}
      </Container>
    </>
  );
}
