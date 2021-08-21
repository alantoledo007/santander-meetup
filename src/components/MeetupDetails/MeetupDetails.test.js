import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import MeetupDetails from "src/components/MeetupDetails";
import { getTimeFromDatetime } from "src/core/utils";

describe("<MeetupDetails />", () => {
  moment.locale("es");

  const getDate = (subtract = 0, datetime) => {
    return moment(datetime, "DD/MM/YYYY HH:mm")
      .subtract(subtract, "days")
      .format("DD [de] MMMM");
  };

  const mockHandler = jest.fn(async () => Promise.resolve());

  test("Renderiza correctamente un meetup sin haberse registrado", () => {
    const meetup = {
      datetime: "25/08/2021 20:15",
      registered: false,
    };

    render(<MeetupDetails meetup={meetup} onRegistering={mockHandler} />);

    screen.getByLabelText("Fecha límite");
    screen.getByText("Al presionar el botón te inscribiras a la meetup");
    screen.getByText(getDate(0, meetup.datetime));
    screen.getByText(getTimeFromDatetime(meetup.datetime));
    screen.getByText("Confirmar asistencia");
    screen.getByText("Al presionar el botón te inscribiras a la meetup");
  });

  test("Al presionar el boton de registrase se ejecuta la función correspondiente", () => {
    const meetup = {
      datetime: "25/08/2021 20:15",
      registered: false,
    };
    render(<MeetupDetails meetup={meetup} onRegistering={mockHandler} />);
    const button = screen.getByText("Confirmar asistencia");
    userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test("Renderiza correctamente un meetup cuando el user está registrado", () => {
    const meetup = {
      datetime: "25/08/2021 20:15",
      registered: true,
    };

    const { queryByText } = render(
      <MeetupDetails meetup={meetup} onRegistering={mockHandler} />
    );

    screen.getByText(getDate(0, meetup.datetime));
    screen.getByText(getTimeFromDatetime(meetup.datetime));
    screen.getByText("Cancelar inscripción");

    expect(
      queryByText("Al presionar el botón te inscribiras a la meetup")
    ).toBe(null);
  });
});
