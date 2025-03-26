import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// 🔐 Utilidad para headers con token
const authHeader = (isFormData = false) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return { headers };
};

// 📡 Obtener todos los dispositivos (requiere login)
export const getAllDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener los dispositivos:', error);
    throw error;
  }
};

// ➕ Crear un nuevo dispositivo (requiere admin)
export const createDevice = async (deviceData) => {
  try {
    const response = await axios.post(
      `${API_URL}/devices/`, 
      deviceData,
      authHeader(true) // Indicamos que es FormData
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear el dispositivo:', error);
    throw error;
  }
};

// 🔍 Obtener detalles de un dispositivo
export const getDeviceDetails = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/devices/${deviceId}/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener el dispositivo:', error);
    throw error;
  }
};

// 🔄 Actualizar un dispositivo completo
export const updateDevice = async (deviceId, deviceData) => {
  try {
    const response = await axios.put(
      `${API_URL}/devices/${deviceId}/`, 
      deviceData,
      authHeader(true) // Indicamos que es FormData
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el dispositivo:', error);
    throw error;
  }
};

// ✏️ Patch (actualización parcial) del dispositivo
export const patchDevice = async (deviceId, deviceData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/devices/${deviceId}/`, 
      deviceData,
      authHeader(true) // Indicamos que es FormData
    );
    return response.data;
  } catch (error) {
    console.error('Error al hacer patch al dispositivo:', error);
    throw error;
  }
};

// ❌ Eliminar dispositivo
export const deleteDevice = async (deviceId) => {
  try {
    const response = await axios.delete(`${API_URL}/devices/${deviceId}/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el dispositivo:', error);
    throw error;
  }
};

// 👤 Registrar nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

// 🔐 Iniciar sesión (retorna tokens)
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login/`, loginData);
    console.log('Login API response (raw):', response);  // Debug completo
    console.log('Login API response (data):', response.data);  // Debug datos
    if (!response.data || !response.data.access) {
      throw new Error('Respuesta de login inválida');
    }
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response || error);
    throw error;
  }
};

// 🔒 Cerrar sesión
export const logoutUser = async () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// 📄 Obtener tu perfil
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};

// ✏️ Actualizar tu perfil
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/profile/`, 
      profileData,
      authHeader(true) // Indicamos que es FormData
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    throw error;
  }
};

// 📄 Obtener perfil por ID
export const getUserProfileById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/${userId}/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};

// ✏️ Actualizar perfil por ID (admin)
export const updateUserProfileById = async (userId, profileData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/profile/${userId}/`, 
      profileData,
      authHeader(true) // Indicamos que es FormData
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    throw error;
  }
};

// 🔒 Verificar si el usuario está autenticado
export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/check-auth/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    throw error;
  }
};

// 🔄 Refrescar token
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/token/refresh/`);
    return response.data;
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};
