import {
  createTaskFail,
  createTaskLoading,
  createTaskSuccess,
  deleteTaskFail,
  deleteTaskLoading,
  deleteTaskSuccess,
  fetchTasksFail,
  fetchTasksLoading,
  fetchTasksSuccess,
  updateTaskFail,
  updateTaskLoading,
  updateTaskSuccess,
} from "./reducer";
import api, { baseURL } from "../../utils/axiosInstance";

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksLoading());
  try {
    const response = await api.get(`${baseURL}/task`);
    dispatch(fetchTasksSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchTasksFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};

export const createTask = (taskDetails) => async (dispatch) => {
  dispatch(createTaskLoading());
  try {
    const response = await api.post(`${baseURL}/task`, taskDetails);
    dispatch(createTaskSuccess(response.data));
  } catch (error) {
    dispatch(
      createTaskFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};

export const updateTask = (taskId, taskDetails) => async (dispatch) => {
  console.log(taskId, "taskId", taskDetails, "taskDetails");
  dispatch(updateTaskLoading());
  try {
    const response = await api.put(`${baseURL}/task/${taskId}`, taskDetails);
    dispatch(updateTaskSuccess(response.data));
    dispatch(fetchTasks());
  } catch (error) {
    dispatch(
      updateTaskFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  console.log(taskId);
  dispatch(deleteTaskLoading());
  try {
    await api.delete(`${baseURL}/task/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(
      deleteTaskFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};
