import axios from '../../../api';
/**
 * This action makes an api call to register user
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const registerAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post('/api/v1/users/register', data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 * This action makes an api call to login user
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const loginAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post('/api/v1/users/login', data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 * This action makes an api call to logout user
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const logoutAPI = async (rejectWithValue) => {
  try {
    return await axios.delete('/api/v1/users/logout');
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const createBookingAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post('/api/v1/users/bookings', data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const findBookingsAPI = async (data, rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/users/bookings/${data}`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const makePaymentAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post('/api/v1/users/charge', data);
  } catch (error) {
    return rejectWithValue(error);
  }
};
/**
 *
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const getPhotographersAPI = async (rejectWithValue) => {
  try {
    return await axios.get('/api/v1/users/photographers');
  } catch (error) {
    return rejectWithValue(error);
  }
};
/**
 *
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const getCaterersAPI = async (rejectWithValue) => {
  try {
    return await axios.get('/api/v1/users/caterers');
  } catch (error) {
    return rejectWithValue(error);
  }
};
/**
 *
 * @param {*} data
 * @param {*} rejectWithValue
 * @returns
 */
const updateUserAPI = async (data, rejectWithValue) => {
  try {
    return await axios.put(`/api/v1/users/${data.id}`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

export {
  registerAPI,
  loginAPI,
  logoutAPI,
  createBookingAPI,
  findBookingsAPI,
  makePaymentAPI,
  getPhotographersAPI,
  getCaterersAPI,
  updateUserAPI,
};
