import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const fetchFeed = createAsyncThunk("posts/fetchFeed", async (token) => {
  const response = await axios.get(
    "https://dhrutham-connect-backend.janaki23.repl.co/posts",
    {
      headers: {
        authorization: token,
      },
    }
  );

  return response.data.postList;
});
export const fetchPostsOfUser = createAsyncThunk(
  "posts/fetchPostsOfUser",
  async ({ userName, token }) => {
    const response = await axios.get(
      `https://dhrutham-connect-backend.janaki23.repl.co/posts/${userName}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data.postList;
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, { rejectWithValue }) => {
    // console.log(text);
    try {
      const response = await axios.post(
        "https://dhrutham-connect-backend.janaki23.repl.co/posts",
        {
          text: data.text,
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
    `https://dhrutham-connect-backend.janaki23.repl.co/posts/like/${data.postId}`,
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
    `https://dhrutham-connect-backend.janaki23.repl.co/posts/unlike/${data.postId}`,
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
  initialState: postsAdapter.getInitialState({
    feedStatus: "idle",
    userProfilePostsStatus: "idle",
    error: null,
    addStatus: "idle",
  }),
  reducers: {
    postsReset: (state, action) => {
      postsAdapter.removeAll(state);
      state.feedStatus = "idle";
      state.userProfilePostsStatus = "idle";
      state.addStatus = "idle";
      state.error = "null";
    },
  },
  extraReducers: {
    [fetchFeed.pending]: (state, action) => {
      state.feedStatus = "loading";
    },
    [fetchFeed.fulfilled]: (state, action) => {
      state.feedStatus = "succeeded";
      postsAdapter.removeAll(state);
      // Add any fetched posts to the array
      postsAdapter.upsertMany(state, action.payload);
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
      // Add any fetched posts to the array
      postsAdapter.removeAll(state);
      postsAdapter.upsertMany(state, action.payload);
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
      postsAdapter.addOne(state, action.payload.post);
      // Add any fetched posts to the array
      // postsAdapter.upsertMany(state, action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.addStatus = "failed";
      state.error = action.payload.message;
    },

    [likePost.fulfilled]: (state, action) => {
      let existingPost = state.entities[action.payload.postId];
      existingPost.likes.push(action.payload.userId);
    },
    [unlikePost.fulfilled]: (state, action) => {
      let existingPost = state.entities[action.payload.postId];
      const currentUserIndex = existingPost.likes.indexOf(
        action.payload.userId
      );
      existingPost.likes.splice(currentUserIndex, 1);
    },
  },
});
export const { postsReset } = postsSlice.actions;
export default postsSlice.reducer;
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);
