import { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootState, setupStore } from "../../../store/store";
import { Details } from "../Details";
import { fireEvent, screen, render } from "@testing-library/react";
import { IDetailsMovie } from "../../../interfaces/IDetailsMovie";

const mockUseFavorites = () => jest.fn();
jest.mock("../utils/useSaveFavorites.ts", () => ({
  useSaveFavorites: () => ({
    handleOnSaveFavorites: mockUseFavorites,
  }),
}));

const mockHandleColor = jest.fn();

jest.mock("../utils/handleColor.ts", () => ({
  handleColor: () => mockHandleColor,
}));

const mockData: IDetailsMovie = {
  backdrop_path: "mock",
  id: "123456",
  poster_path: "mock",
  overview: "mock",
  title: "mock",
  genres: [],
  vote_average: 8,
};
const renderDetailsWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore()}>
      <Details data={mockData} />
    </Provider>
  );
describe("Details", () => {
  test("should be call handleOnSaveFavorites", () => {
    renderDetailsWithProvider();
    fireEvent.click(screen.getByTestId("star"));
    expect(mockUseFavorites).toHaveBeenCalledTimes(1);
  });
});
