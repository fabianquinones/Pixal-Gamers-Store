import React, { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)


const USERS_KEY = 'tg_users' // lista de usuarios registrados
const SESSION_KEY = 'tg_session' // usuario logueado actual


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)


    // Cargar sesión persistida
    useEffect(() => {
        const raw = localStorage.getItem(SESSION_KEY)
        if (raw) { setUser(JSON.parse(raw)) }
    }, [])


    const getUsers = () => {
        const raw = localStorage.getItem(USERS_KEY)
        return raw ? JSON.parse(raw) : []
    }


    const saveUsers = (list) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(list))
    }


    const isValidEmail = (em) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
    }

    const isValidPhone = (tel) => {
        return /^[+0-9\s\-()]{7,15}$/.test(tel)
    }

    const register = ({ nombre, apellido, email, password, telefono }) => {
        // basic validations
        if (!nombre || !email || !password) {
            throw new Error('Nombre, correo y contraseña son obligatorios.')
        }
        if (!isValidEmail(email)) {
            throw new Error('El correo no tiene un formato válido.')
        }
        if (String(password).length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres.')
        }
        if (!telefono || !isValidPhone(telefono)) {
            throw new Error('El teléfono no es válido. Use sólo números y caracteres + - ( ).')
        }

        const users = getUsers()
        const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase())
        if (exists) { throw new Error('El correo ya está en uso.') }

        // Determinar tipo de usuario
        let tipo = 'user';
        if (email.endsWith('@duocuc.cl')) {
            tipo = 'admin';
        }
        const newUser = { id: crypto.randomUUID(), nombre, apellido, email, password, telefono, tipo }
        users.push(newUser)
        saveUsers(users)
        return { id: newUser.id, nombre, apellido, email, telefono, tipo }
    }


    const login = ({ email, password }) => {
    const users = getUsers()
    const match = users.find(u => u.email === email && u.password === password)
    if (!match) { throw new Error('Usuario o contraseña inválidos.') }
    const tipo = match.tipo || (email.endsWith('@duocuc.cl') ? 'admin' : 'user');
    const sessionUser = { id: match.id, nombre: match.nombre, apellido: match.apellido, email: match.email, tipo }
    setUser(sessionUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
    return sessionUser
    }


    const logout = () => {
        setUser(null)
        localStorage.removeItem(SESSION_KEY)
    }


    // Mostrar nombre con tipo si es admin
    const getDisplayName = () => {
        if (!user) return '';
        if (user.tipo === 'admin') {
            return `admin: ${user.nombre}`;
        }
        return user.nombre;
    }

    const value = { user, register, login, logout, getDisplayName }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}