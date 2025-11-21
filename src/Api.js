import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

//USUARIOS
export const registro = (payload) => api.post("/usuarios/registro", payload);

export const login = async (payload) => {
  const res = await api.post("/usuarios/login", payload);
  return res.data;
};

export const updatePerfil = (idUsuario, payload) => api.put(`/usuarios/${idUsuario}/perfil`, payload);

export const logout = () => api.post("/usuarios/logout");

export const deleteUsuario = (idUsuario) => api.delete(`/usuarios/${idUsuario}`);

// CONTACTO 

export const sendContacto = (payload) => api.post("/contacto", payload);

export const getContactos = async () => {
  const resContactos = await api.get("/contacto");
  const contactos = Array.isArray(resContactos.data) ? resContactos.data : (resContactos.data?.content ?? []);
  return contactos;
};

// PRODUCTOS 

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
  const resDestacados = await api.get("/productos/destacados");
  const destacados = Array.isArray(resDestacados.data) ? resDestacados.data : (resDestacados.data?.content ?? []);
  return destacados;
};

//VENTAS Y CARRITO 
export const getHistorialVentas = async (idUsuario) => {
  const res = await api.get("/ventas/historial", { params: { idUsuario } });
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data;
};

// Obtener una venta por ID
export const getVenta = async (idVenta) => {
  const res = await api.get(`/ventas/${idVenta}`);
  return res.data;
};

export const getCarritoBackend = async (idUsuario) => {
  const res = await api.get(`/ventas/carrito`, { params: { idUsuario } });
  return res.data;
};

export const addItemCarritoBackend = async (idUsuario, item) => {
  const res = await api.post(`/ventas/carrito/items`, item, { params: { idUsuario } });
  return res.data;
};

export const updateItemCarritoBackend = async (idItem, cantidad) => {
  const res = await api.put(`/ventas/carrito/items/${idItem}`, { cantidad });
  return res.data;
};

export const eliminarItemCarritoBackend = async (idItem) => {
  await api.delete(`/ventas/carrito/items/${idItem}`);
};

export const vaciarCarritoBackend = async (idUsuario) => {
  await api.delete(`/ventas/carrito`, { params: { idUsuario } });
};

export const checkoutVenta = async (idUsuario) => {
  const res = await api.post(`/ventas/checkout`, null, { params: { idUsuario } });
  return res.data;
};


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


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Solo redirigir si NO estamos en login/registro
      const currentPath = window.location.pathname.toLowerCase();
      const isAuthPage = currentPath === '/login' || currentPath === '/registro';
      
      localStorage.removeItem("token");
      
      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }
    
    
    if (error.response?.status === 409 && error.response?.data?.error === 'stock_insuficiente') {
      const cleanError = new Error('Stock agotado');
      cleanError.response = {
        status: 409,
        data: {
          error: 'stock_insuficiente',
          mensaje: 'Stock agotado'
        }
      };
      return Promise.reject(cleanError);
    }
    
    
    if (error.response?.status === 400 && error.response?.data?.mensaje) {
      const cleanError = new Error(error.response.data.mensaje);
      cleanError.response = error.response;
      return Promise.reject(cleanError);
    }
    
    return Promise.reject(error);
  }
);

export default api;