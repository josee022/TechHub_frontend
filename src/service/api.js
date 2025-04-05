import axios from 'axios';

// Usar la URL de la API desde variables de entorno o valor por defecto
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Función para obtener la URL completa de una imagen
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_URL.replace('/api', '')}${imagePath}`;
};

// Función para obtener el usuario actual desde localStorage
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    return null;
  }
};

// 🔐 Utilidad para headers con token
const authHeader = (isFormData = false) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return isFormData ? { headers: {} } : { headers: { 'Content-Type': 'application/json' } };
  }
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return { headers };
};

// 📱 Obtener todos los dispositivos (con paginación y filtros)
export const getAllDevices = async (page = 1, filters = {}) => {
  try {
    // Construir los parámetros de consulta
    const params = new URLSearchParams({
      page: page,
      ...filters
    });

    const url = `${API_URL}/devices/?${params.toString()}`;
    const response = await axios.get(url, authHeader());
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
    if (!response.data || !response.data.access) {
      throw new Error('Respuesta de login inválida');
    }
    
    // Guardar token y datos de usuario
    localStorage.setItem('token', response.data.access);
    
    // Guardar información del usuario
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
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
    
    // Actualizar la información del usuario en localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
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
    
    // Actualizar la información del usuario en localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
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
    const token = localStorage.getItem('token');
    if (!token) {
      return { isAuthenticated: false };
    }
    
    // Intentar obtener el perfil del usuario para verificar si el token es válido
    await getUserProfile();
    return { isAuthenticated: true };
  } catch (error) {
    console.error('Error al verificar estado de autenticación:', error);
    // Si hay un error (401 probablemente), limpiar el token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { isAuthenticated: false };
  }
};

// 🔄 Refrescar token
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) throw new Error('No hay token de refresco');
    
    const response = await axios.post(`${API_URL}/users/token/refresh/`, { refresh });
    localStorage.setItem('token', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};

// ⭐ Obtener reviews de un dispositivo
export const getDeviceReviews = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/device/${deviceId}/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reviews:', error);
    throw error;
  }
};

// 🔢 Obtener media de puntuación
export const getAverageRating = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/device/${deviceId}/average/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener la media de puntuación:', error);
    throw error;
  }
};

// 📝 Crear nueva review
export const createReview = async (deviceId, reviewData) => {
  try {
    const formData = new FormData();
    
    // Añadir todos los campos
    Object.keys(reviewData).forEach(key => {
      if (key === 'imagen' && reviewData[key]) {
        formData.append(key, reviewData[key]);
      } else if (key !== 'imagen') {
        formData.append(key, reviewData[key]);
      }
    });
    
    const response = await axios.post(
      `${API_URL}/reviews/device/${deviceId}/`,
      formData,
      authHeader(true)
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear la review:', error);
    throw error;
  }
};

// ❌ Eliminar review
export const deleteReview = async (deviceId, reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/reviews/device/${deviceId}/${reviewId}/`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la review:', error);
    throw error;
  }
};

// ✏️ Actualizar review
export const updateReview = async (deviceId, reviewId, data) => {
  try {
    const formData = new FormData();
    
    // Añadir todos los campos
    Object.keys(data).forEach(key => {
      if (key === 'imagen' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (key !== 'imagen') {
        formData.append(key, data[key]);
      }
    });
    
    const response = await axios.put(
      `${API_URL}/reviews/device/${deviceId}/${reviewId}/`,
      formData,
      authHeader(true)
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la review:', error);
    throw error;
  }
};

// Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/devices/dashboard/`, authHeader());
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas del dashboard:', error);
    throw error;
  }
};
