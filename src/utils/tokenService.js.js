
import { api } from './api'

export const validateToken = async () => {
  try {
    const response = await api.getRequest(`/api/auth/validate`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.getRequest(`/api/auth/refresh-token`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
