import axios from "axios";
import { vi } from "vitest";
import { fetchUserData, fetchUserPostData } from "../store/userActions";
import { userActions } from "../store/userSlice";
import { data } from "react-router-dom";

// mock fetching behavior
vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("user asunc actions", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("dispatches updateUser with fetched users", async () => {
    const dispatch = vi.fn();
    const mockData = [{ id: 1, name: "somebody", username: "someone" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData }); // mock fetching once

    await fetchUserData()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(userActions.updateUser(mockData));
  });

  it("dispatches updateUserPost with fetched posts", async () => {
    const dispatch = vi.fn();
    const mockData = [
      { id: 1, userId: 1, title: "someone's post", body: "post body" },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    await fetchUserPostData()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(userActions.updateUserPost(mockData));
  });
});
