import axios from '../../api';
export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bookify');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/djm8vdhzf/image/upload',
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
