import axios from '../../../api';
/**
 *
 *
 * @param {*} rejectWithValue
 * @returns
 */
const bookingsAPI = async (rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/admin/bookings`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 *
 * @param {*} rejectWithValue
 * @returns
 */
const usersAPI = async (rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/admin/users`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 *
 * @param {*} rejectWithValue
 * @returns
 */
const createUserAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post(`/api/v1/admin/users`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 *
 * @param {*} rejectWithValue
 * @returns
 */
const updateUserAPI = async (data, rejectWithValue) => {
  try {
    return await axios.put(`/api/v1/admin/users/${data.id}`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} rejectWithValue
 * @returns
 */
const deleteUserAPI = async (data, rejectWithValue) => {
  try {
    return await axios.delete(`/api/v1/admin/users/${data}`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} rejectWithValue
 * @returns
 */
const acceptBookingAPI = async (data, rejectWithValue) => {
  try {
    return await axios.patch(`/api/v1/admin/bookings/${data}`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} rejectWithValue
 * @returns
 */
const deleteBookingAPI = async (data, rejectWithValue) => {
  try {
    return await axios.delete(`/api/v1/admin/bookings/${data}`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} rejectWithValue
 * @returns
 */
const findUserAPI = async (data, rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/admin/users/${data}`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

/**
 *
 * @param {*} rejectWithValue
 * @returns
 */
const getRevenueAPI = async (data, rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/admin/revenue`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

export {
  bookingsAPI,
  usersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  acceptBookingAPI,
  deleteBookingAPI,
  findUserAPI,
  getRevenueAPI,
};
