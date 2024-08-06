import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksLoading(state) {
      state.loading.fetch = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action) {
      state.loading.fetch = false;
      state.tasks = action.payload;
    },
    fetchTasksFail(state, action) {
      state.loading.fetch = false;
      state.error = action.payload;
    },
    createTaskLoading(state) {
      state.loading.create = true;
      state.error = null;
    },
    createTaskSuccess(state, action) {
      state.loading.create = false;
      state.tasks = [...state.tasks, action.payload];
    },
    createTaskFail(state, action) {
      state.loading.create = false;
      state.error = action.payload;
    },
    updateTaskLoading(state) {
      state.loading.update = true;
      state.error = null;
    },
    updateTaskSuccess(state, action) {
      state.loading.update = false;
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    updateTaskFail(state, action) {
      state.loading.update = false;
      state.error = action.payload;
    },
    deleteTaskLoading(state) {
      state.loading.delete = true;
      state.error = null;
    },
    deleteTaskSuccess(state, action) {
      state.loading.delete = false;
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    deleteTaskFail(state, action) {
      state.loading.delete = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasksLoading,
  fetchTasksSuccess,
  fetchTasksFail,
  createTaskLoading,
  createTaskSuccess,
  createTaskFail,
  updateTaskLoading,
  updateTaskSuccess,
  updateTaskFail,
  deleteTaskLoading,
  deleteTaskSuccess,
  deleteTaskFail,
} = taskSlice.actions;

export default taskSlice.reducer;
