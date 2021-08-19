import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import moment from "moment";
import MeetupDetails from "src/components/MeetupDetails";

describe("<MeetupDetails", () => {
  moment.locale("es");
  const meetup = {
    datetime: "25/08/2021",
  };
  const mockHndler = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
      <MeetupDetails meetup={meetup} onRegistering={mockHndler} />
    );
  });
  test("renders content", () => {
    component.getByText("Meetup");
    component.getByText("25 de agosto");
  });

  test("clicking the button", () => {
    const meetup = {
      datetime: "25/08/2021",
    };

    const button = component.getByText("Confirmar asistencia");
    fireEvent.click(button);

    expect(mockHndler).toHaveBeenCalledTimes(1);
  });
});
