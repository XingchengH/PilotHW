import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface UserState {
  users: User[];
  allUsers: User[];
  posts: Post[];
  allPosts: Post[];
  todos: Todo[];
  allTodos: Todo[];
  comments: Comment[];
  isUserSorted: boolean;
  isPostSorted: boolean;
  isTodoSorted: boolean;
}

const initialState: UserState = {
  users: [],
  allUsers: [],
  posts: [],
  allPosts: [],
  todos: [],
  allTodos: [],
  comments: [],
  isUserSorted: false,
  isPostSorted: false,
  isTodoSorted: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.allUsers = action.payload;
      state.isUserSorted = false;
    },

    updateUserPost(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.allPosts = action.payload;
    },

    updateTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
      state.allTodos = action.payload;
    },

    updateComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },

    searchUser(state, action: PayloadAction<string>) {
      const term = action.payload.toLowerCase();
      state.users = state.allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term)
      );
    },

    sortUser(state) {
      if (!state.isUserSorted) {
        state.users = [...state.users].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        state.isUserSorted = true;
      } else {
        state.users = [...state.allUsers];
        state.isUserSorted = false;
      }
    },

    sortPost(state) {
      if (!state.isPostSorted) {
        state.posts = [...state.posts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        state.isPostSorted = true;
      } else {
        state.posts = [...state.allPosts];
        state.isPostSorted = false;
      }
    },

    sortTodo(state) {
      if (state.isTodoSorted) {
        state.todos = [...state.todos].sort((a, b) =>
          a.title.trim().localeCompare(b.title.trim())
        );
        state.isTodoSorted = true;
      } else {
        state.todos = [...state.allTodos];
        state.isTodoSorted = false;
      }
    },

    searchPost(state, action: PayloadAction<string>) {
      const term = action.payload.toLowerCase();
      state.posts = state.allPosts.filter((post) =>
        post.title.toLowerCase().includes(term)
      );
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
