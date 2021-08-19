import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Header from "src/components/Header";

test("renders content", () => {
  const component = render(<Header />);
  component.getByText("Santander Meetup");
});
