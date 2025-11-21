import React, { createContext, useContext, useEffect, useState } from 'react'
import * as api from '../Api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

const SESSION_KEY = 'tg_session' // usuario logueado actual

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [ready, setReady] = useState(false)

    // Cargar sesión persistida
    useEffect(() => {
        const raw = localStorage.getItem(SESSION_KEY)
        if (raw) {
            const u = JSON.parse(raw)
            setUser(u)
            setIsAdmin(!!u?.email && u.email.toLowerCase().endsWith('@duocuc.cl'))
        }
        setReady(true)
    }, [])

    const register = async ({ nombre, apellido, email, password, telefono, direccion }) => {
        try {
            const payload = {
                nombre,
                apellido,
                correo: email,
                contrasena: password,
                telefono,
                direccion
            }
            const response = await api.registro(payload)
            return response.data
        } catch (error) {
            if (error.response?.data?.mensaje) {
                throw new Error(error.response.data.mensaje)
            }
            throw new Error('Error al registrar usuario')
        }
    }

    const login = async ({ email, password }) => {
        try {
            const payload = {
                correo: email,
                contrasena: password
            }
            const usuario = await api.login(payload)
            const sessionUser = {
                id: usuario.idUsuario,
                nombre: usuario.nombreUsuario,
                apellido: usuario.apellidoUsuario,
                email: usuario.correo,
                telefono: usuario.telefono,
                direccion: usuario.dirUsuario
            }
            setUser(sessionUser)
            setIsAdmin(!!sessionUser.email && sessionUser.email.toLowerCase().endsWith('@duocuc.cl'))
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
            return sessionUser
        } catch (error) {
            if (error.response?.data?.mensaje) {
                throw new Error(error.response.data.mensaje)
            }
            throw new Error('Usuario o contraseña inválidos')
        }
    }

    const logout = async () => {
        try {
            await api.logout()
        } catch (error) {
            console.error('Error al hacer logout:', error)
        } finally {
            setUser(null)
            setIsAdmin(false)
            localStorage.removeItem(SESSION_KEY)
        }
    }

    const updateProfile = async (datos) => {
        if (!user) throw new Error('No hay usuario logueado')
        
        try {
            const response = await api.updatePerfil(user.id, datos)
            const updatedUser = {
                ...user,
                nombre: response.data.nombreUsuario,
                apellido: response.data.apellidoUsuario,
                telefono: response.data.telefono,
                direccion: response.data.dirUsuario
            }
            setUser(updatedUser)
            setIsAdmin(!!updatedUser.email && updatedUser.email.toLowerCase().endsWith('@duocuc.cl'))
            localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))
            return updatedUser
        } catch (error) {
            if (error.response?.data?.mensaje) {
                throw new Error(error.response.data.mensaje)
            }
            throw new Error('Error al actualizar perfil')
        }
    }

    const deleteAccount = async () => {
        if (!user) throw new Error('No hay usuario logueado')
        try {
            await api.deleteUsuario(user.id)
        } catch (error) {
            if (error.response?.data?.mensaje) {
                throw new Error(error.response.data.mensaje)
            }
            throw new Error('Error al eliminar cuenta')
        } finally {
            // limpiar sesión local siempre al intentar eliminar
            setUser(null)
            setIsAdmin(false)
            localStorage.removeItem(SESSION_KEY)
        }
    }

    const value = { user, isAdmin, ready, register, login, logout, updateProfile, deleteAccount }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}