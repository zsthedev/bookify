import axios from '../../../api';

/**
 *
 *
 * @param {*} rejectWithValue
 * @returns
 */
const fetchAllDishesAPI = async (rejectWithValue) => {
  try {
    return await axios.get(`/api/v1/dishes`);
  } catch (error) {
    return rejectWithValue(error);
  }
};

export { fetchAllDishesAPI };
