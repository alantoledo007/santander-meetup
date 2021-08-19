import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import LoginForm from "src/components/LoginForm";
import userEvent from "@testing-library/user-event";

describe("<LoginForm />", () => {
  const loginMock = jest.fn((email, password) =>
    Promise.resolve({ email, password })
  );

  beforeEach(() => {
    render(<LoginForm login={loginMock} />);
  });

  test("Se renderiza el formulario", async () => {
    screen.getByLabelText("Título");
    screen.getByPlaceholderText("Email");
    screen.getByPlaceholderText("Contraseña");
    screen.getByLabelText("Enviar");
  });

  test("Exigir campos requeridos (no enviar formulario vacio)", async () => {
    const button = screen.getByLabelText("Enviar");
    await act(async () => userEvent.click(button));

    screen.getByText("Debe ingresar su correo electrónico.");
    screen.getByText("Debe ingresar su contraseña.");
  });

  test("Exigir un correo electrónico válido", async () => {
    const input = screen.getByPlaceholderText("Email");
    await act(async () => userEvent.type(input, "asdsad"));
  });

  test("Se ejecuta la función de login y se limpia el formulario", async () => {
    const inputEmail = screen.getByPlaceholderText("Email");
    const inputPassword = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByLabelText("Enviar");
    const email = "alantoledo.work@gmail.com";
    const password = "Test1234";
    await act(async () => {
      userEvent.type(inputEmail, email);
      userEvent.type(inputPassword, password);
    });

    await act(async () => userEvent.click(button));
    //si el usuario puede ver el título de meetups es porque ya inició sesión
    expect(loginMock).toBeCalledWith(email, password);
    expect(inputEmail.value).toBe("");
    expect(inputPassword.value).toBe("");
  });
});
