import { screen, render } from "@testing-library/react";
import { Genre } from "../Genre";

describe("Genre Component", () => {
  test("should be values insert into expect", () => {
    render(<Genre name={"Action"} />);

    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
