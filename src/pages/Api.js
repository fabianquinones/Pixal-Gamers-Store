import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // gracias al proxy de Vite
});

// ==================== USUARIOS ====================

export const registro = (payload) => api.post("/usuarios/registro", payload);

export const login = async (payload) => {
  const res = await api.post("/usuarios/login", payload);
  return res.data;
};

export const getPerfil = async () => {
  const res = await api.get("/usuarios/perfil");
  return res.data;
};

export const updatePerfil = (payload) => api.put("/usuarios/perfil", payload);

export const logout = () => api.post("/usuarios/logout");

export const validateToken = async () => {
  const res = await api.get("/usuarios/validate");
  return res.data;
};

export const sendContacto = (payload) => api.post("/usuarios/contacto", payload);

export const getContactos = async () => {
  const res = await api.get("/usuarios/contacto");
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data;
};

// ==================== PRODUCTOS ====================

export const getProductos = async (params = {}) => {
  const res = await api.get("/productos", { params });
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data;
};

export const getProducto = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

export const createProducto = (payload) => api.post("/productos", payload);

export const updateProducto = (id, payload) => api.put(`/productos/${id}`, payload);

export const deleteProducto = (id) => api.delete(`/productos/${id}`);

export const getProductosDestacados = async () => {
  const res = await api.get("/productos/destacados");
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data;
};

// ==================== VENTAS ====================

export const createVenta = (payload) => api.post("/ventas", payload);

export const getVentas = async () => {
  const res = await api.get("/ventas");
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data;
};

export const getVenta = async (id) => {
  const res = await api.get(`/ventas/${id}`);
  return res.data;
};

export const getHistorialVentas = async () => {
  const res = await api.get("/ventas/historial");
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data;
};

export const updateEstadoVenta = (id, payload) => api.put(`/ventas/${id}/estado`, payload);

// ==================== CARRITO ====================

export const getCarrito = async () => {
  const res = await api.get("/ventas/carrito");
  return res.data;
};

export const addItemCarrito = (payload) => api.post("/ventas/carrito/items", payload);

export const updateItemCarrito = (id, payload) => api.put(`/ventas/carrito/items/${id}`, payload);

export const deleteItemCarrito = (id) => api.delete(`/ventas/carrito/items/${id}`);

export const clearCarrito = () => api.delete("/ventas/carrito");

// ==================== LOGÍSTICA ====================

export const createEnvio = (payload) => api.post("/logistica/envio", payload);

export const getEnvio = async (ventaId) => {
  const res = await api.get(`/logistica/envio/${ventaId}`);
  return res.data;
};

export const updateEstadoEnvio = (id, payload) => api.put(`/logistica/envio/${id}/estado`, payload);

export const rastrearEnvio = async (codigo) => {
  const res = await api.get(`/logistica/rastreo/${codigo}`);
  return res.data;
};

// Interceptor para agregar token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;