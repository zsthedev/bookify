import axios from '../../../api';

/**
 *
 *
 * @param {*} rejectWithValue
 * @returns
 */
const fetchAllDealsAPI = async (rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/deals`);
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
const createCustomDealAPI = async (data, rejectWithValue) => {
  try {
    return await axios.post(`/api/v1/users/deals`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
};

export { fetchAllDealsAPI, createCustomDealAPI };
