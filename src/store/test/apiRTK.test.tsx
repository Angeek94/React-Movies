import { ReactNode } from "react";
import {
  useGetMoviesByPageQuery,
  useGetDetailsMovieByIDQuery,
  useGetMoviesBySearchQuery,
} from "../apiRTK";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import { renderHook } from "@testing-library/react";

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={setupStore()}>{props.children}</Provider>;
}

describe("apiRTK", () => {
  test("should get movies by page", () => {
    const { result } = renderHook(() => useGetMoviesByPageQuery("1"), {
      wrapper: Wrapper,
    });
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getMoviesByPage",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
  });

  test("should get details movie by ID", () => {
    const { result } = renderHook(() => useGetDetailsMovieByIDQuery("1345"), {
      wrapper: Wrapper,
    });
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getDetailsMovieByID",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
  });

  test("should get movies by search", () => {
    const { result } = renderHook(() => useGetMoviesBySearchQuery("Harry"), {
      wrapper: Wrapper,
    });
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getMoviesBySearch",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
  });
});
