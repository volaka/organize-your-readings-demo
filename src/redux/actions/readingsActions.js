import {
  ADD_READINGS,
  ADD_READINGS_FAIL,
  ADD_READINGS_REQUEST,
  SELECT_READING
} from "../actionTypes";
import axios from "axios";

export const addReading = url => dispatch => {
  dispatch({ type: ADD_READINGS_REQUEST });
  axios({
    method: 'GET',
    url: 'http://localhost:8080',
    params: {
      url
    }
  }).then(res => {
    dispatch({
      type: ADD_READINGS,
      payload: res.data
    })
  })
    .catch(() => dispatch({ type: ADD_READINGS_FAIL }));
};

export const selectReading = (id) => dispatch => {
  dispatch({
    type: SELECT_READING,
    payload: id
  })
};