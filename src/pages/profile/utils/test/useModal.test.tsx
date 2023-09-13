import { renderHook } from "@testing-library/react";
import { useModal } from "../useModal";

const mockedSetIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> =
  jest.fn();

describe("useModal", () => {
  test("should show modal", () => {
    const { result } = renderHook(useModal);
    result.current.showModal(mockedSetIsModalOpen);
    expect(mockedSetIsModalOpen).toHaveBeenCalledWith(true);
  });

  test("should disappear modal after Ok", () => {
    const { result } = renderHook(useModal);
    result.current.handleOk(mockedSetIsModalOpen);
    expect(mockedSetIsModalOpen).toHaveBeenCalledWith(false);
  });

  test("should disappear modal after Cancel", () => {
    const { result } = renderHook(useModal);
    result.current.handleCancel(mockedSetIsModalOpen);
    expect(mockedSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});
