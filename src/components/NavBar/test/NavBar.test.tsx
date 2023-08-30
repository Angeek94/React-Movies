import { fireEvent, render, screen } from "@testing-library/react";
import { NavBar } from "../NavBar";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../images/profile.jpg");

const renderNavBar = () =>
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

describe("Navbar", () => {
  test("should have Dashboard active", () => {
    renderNavBar();
    fireEvent.click(screen.getByText("Dashboard"));
    expect(screen.getByTestId("dashboard-link")).toHaveClass("active_navlink");

    fireEvent.click(screen.getByText("Search movie"));
    expect(screen.getByTestId("search-link")).toHaveClass("active_navlink");

    fireEvent.click(screen.getByText("Favorites"));
    expect(screen.getByTestId("favorites-link")).toHaveClass("active_navlink");
  });
});
