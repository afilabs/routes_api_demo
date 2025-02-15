import axios from 'axios';

const DIRECTION_API_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const getHeaders = () => ({
  'x-goog-api-key': API_KEY,
  'x-goog-fieldmask': '*',
});

const buildRequestBody = (body) => ({
  ...body,
  polylineQuality: 'high_quality',
  computeAlternativeRoutes: true,
});

const getDirections = async (body) => {
  try {
    const response = await axios.post(DIRECTION_API_URL, buildRequestBody(body), {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error;
  }
};

export { getDirections };
