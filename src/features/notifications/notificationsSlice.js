import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
const notificationsAdapter = createEntityAdapter({
  selectId: (notification) => notification._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (token) => {
    const response = await axios.get(`${API_URL}/notifications`, {
      headers: {
        authorization: token,
      },
    });

    return response.data.notificationList;
  }
);

export const notificationsSlice = createSlice({
  name: "posts",
  initialState: notificationsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    notificationsReset: (state, action) => {
      notificationsAdapter.removeAll(state);
      state.status = "idle";
      state.error = "null";
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      // Add any fetched posts to the array
      notificationsAdapter.upsertMany(state, action.payload);
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export default notificationsSlice.reducer;
export const { notificationsReset } = notificationsSlice.actions;
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications);
