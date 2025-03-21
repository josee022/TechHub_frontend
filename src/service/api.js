import axios from 'axios';

// URL base de la API (ajústala según la configuración de tu backend)
const API_URL = 'http://localhost:8000/api'; // Reemplaza con la URL correcta

// Función para obtener todos los dispositivos IoT
export const getAllDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los dispositivos:', error);
    throw error;
  }
};

// Función para crear un nuevo dispositivo IoT
export const createDevice = async (deviceData) => {
  try {
    const response = await axios.post(`${API_URL}/devices/`, deviceData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el dispositivo:', error);
    throw error;
  }
};

// Función para obtener un dispositivo IoT específico por ID
export const getDeviceDetails = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/devices/${deviceId}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el dispositivo:', error);
    throw error;
  }
};

// Función para actualizar un dispositivo IoT
export const updateDevice = async (deviceId, deviceData) => {
  try {
    const response = await axios.put(`${API_URL}/devices/${deviceId}/`, deviceData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el dispositivo:', error);
    throw error;
  }
};

// Función para realizar un patch a un dispositivo IoT (actualización parcial)
export const patchDevice = async (deviceId, deviceData) => {
  try {
    const response = await axios.patch(`${API_URL}/devices/${deviceId}/`, deviceData);
    return response.data;
  } catch (error) {
    console.error('Error al hacer patch al dispositivo:', error);
    throw error;
  }
};

// Función para eliminar un dispositivo IoT
export const deleteDevice = async (deviceId) => {
  try {
    const response = await axios.delete(`${API_URL}/devices/${deviceId}/`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el dispositivo:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

// Función para iniciar sesión
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login/`, loginData);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/logout/`);
    return response.data;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};

// Función para actualizar el perfil del usuario
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile/`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    throw error;
  }
};

// Función para obtener el perfil de un usuario específico
export const getUserProfileById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};

// Función para actualizar el perfil de un usuario específico
export const updateUserProfileById = async (userId, profileData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile/${userId}/`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error;
    }
  };

// Función para verificar el estado de autenticación del usuario (protegida)
export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/protected/`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
    throw error;
  }
};

// Función para refrescar el token (si es necesario)
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/refresh/`);
    return response.data;
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};
