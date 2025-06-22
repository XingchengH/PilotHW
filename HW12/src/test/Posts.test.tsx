import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userSlice from "../store/userSlice";
import Posts from "../pages/Posts";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

describe("Post page with real store", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // store mock fetch res
  });

  // test() general-purpose, conponent rendering
  test("renders posts from Redux store", async () => {
    const store = configureStore({
      reducer: {
        users: userSlice.reducer,
      },
      preloadedState: {
        users: {
          users: [],
          allUsers: [],
          posts: [
            {
              userId: 1,
              id: 1,
              title: "First Post",
              body: "This is the first post body.",
            },
          ],
          allPosts: [
            {
              userId: 1,
              id: 1,
              title: "First Post",
              body: "This is the first post body.",
            },
          ],
          todos: [],
          allTodos: [],
          comments: [],
          isUserSorted: false,
          isPostSorted: false,
          isTodoSorted: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </Provider>
    );

    const postTitle = await screen.findByText("First Post");
    expect(postTitle).toBeInTheDocument();
  });
});

// window.fetch = vi.fn();
// window.fetch.mockResolvedValueOnce({
//   json: async () => [
//     { userId: 1, id: 1, title: "First Post", body: "First Post Body" },
//   ],
// });
