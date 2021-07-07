import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";
import { logoutButtonClicked } from "../auth/authSlice";

export const fetchFeed = createAsyncThunk("posts/fetchFeed", async (token) => {
  const response = await axios.get(`${API_URL}/posts`, {
    headers: {
      authorization: token,
    },
  });

  return response.data.postList;
});

export const fetchPostsOfUser = createAsyncThunk(
  "posts/fetchPostsOfUser",
  async ({ userName, token }) => {
    const response = await axios.get(`${API_URL}/posts/${userName}`, {
      headers: {
        authorization: token,
      },
    });
    return response.data.postList;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts`,
        {
          text: data.text,
          asset: data.asset,
        },
        {
          headers: {
            authorization: data.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk("posts/likePost", async (data) => {
  const response = await axios.post(
    `${API_URL}/posts/like/${data.postId}`,
    {},
    {
      headers: {
        authorization: data.token,
      },
    }
  );
  return response.data;
});
export const unlikePost = createAsyncThunk("posts/unlikePost", async (data) => {
  const response = await axios.post(
    `${API_URL}/posts/unlike/${data.postId}`,
    {},
    {
      headers: {
        authorization: data.token,
      },
    }
  );
  return response.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    feed: [],
    userPosts: [],
    feedStatus: "idle",
    userProfilePostsStatus: "idle",
    error: null,
    addStatus: "idle",
  },
  reducers: {
    userPostsReset: (state, dispatch) => {
      state.userPosts = [];
      state.userProfilePostsStatus = "idle";
    },
  },
  extraReducers: {
    [fetchFeed.pending]: (state, action) => {
      state.feedStatus = "loading";
    },
    [fetchFeed.fulfilled]: (state, action) => {
      state.feedStatus = "succeeded";
      state.feed = action.payload;
    },
    [fetchFeed.rejected]: (state, action) => {
      state.feedStatus = "failed";
      state.error = action.error.message;
    },
    [fetchPostsOfUser.pending]: (state, action) => {
      state.userProfilePostsStatus = "loading";
    },
    [fetchPostsOfUser.fulfilled]: (state, action) => {
      state.userProfilePostsStatus = "succeeded";
      state.userPosts = action.payload;
    },
    [fetchPostsOfUser.rejected]: (state, action) => {
      state.userProfilePostsStatus = "failed";
      state.error = action.error.message;
    },
    [addPost.pending]: (state, action) => {
      state.addStatus = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      state.addStatus = "succeeded";
      state.feed.push(action.payload.post);
    },
    [addPost.rejected]: (state, action) => {
      state.addStatus = "failed";
      state.error = action.payload.message;
    },
    [likePost.fulfilled]: (state, action) => {
      state.feed = state.feed.map((post) =>
        post._id === action.payload.postId
          ? { ...post, likes: post.likes.concat(action.payload.userId) }
          : { ...post }
      );
      state.userPosts = state.userPosts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, likes: post.likes.concat(action.payload.userId) }
          : { ...post }
      );
    },

    [unlikePost.fulfilled]: (state, action) => {
      state.feed = state.feed.map((post) =>
        post._id === action.payload.postId
          ? {
              ...post,
              likes: post.likes.filter(
                (userId) => userId !== action.payload.userId
              ),
            }
          : { ...post }
      );
      state.userPosts = state.userPosts.map((post) =>
        post._id === action.payload.postId
          ? {
              ...post,
              likes: post.likes.filter(
                (userId) => userId !== action.payload.userId
              ),
            }
          : { ...post }
      );
    },
    [logoutButtonClicked]: (state, action) => {
      state.feed = [];
      state.feedStatus = "idle";
      state.userProfilePostsStatus = "idle";
      state.addStatus = "idle";
      state.error = "null";
    },
  },
});
export const { userPostsReset } = postsSlice.actions;
export default postsSlice.reducer;
