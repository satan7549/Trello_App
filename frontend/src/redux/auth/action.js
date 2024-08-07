import axios from "axios";
import {
  loginLoading,
  loginSuccess,
  loginFail,
  signupLoading,
  signupSuccess,
  signupFail,
  logout,
} from "./reducer";
import { baseURL } from "../../utils/axiosInstance";

export const login = (loginDetails) => async (dispatch) => {
  dispatch(loginLoading());
  try {
    const response = await axios.post(`${baseURL}/user/login`, loginDetails);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(
      loginFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};



export const signup = (signupDetails) => async (dispatch) => {
  dispatch(signupLoading());
  try {
    const response = await axios.post(
      `${baseURL}/user/register`,
      signupDetails
    );
    dispatch(signupSuccess(response.data));
  } catch (error) {
    dispatch(
      signupFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};

export const userLogout = () => (dispatch) => {
  dispatch(logout());
};
