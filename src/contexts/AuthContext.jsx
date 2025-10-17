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
        // simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
    }

    const isValidPhone = (tel) => {
        // allow digits, spaces, +, -, parentheses; length between 7 and 15
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

        const newUser = { id: crypto.randomUUID(), nombre, apellido, email, password, telefono }
        users.push(newUser)
        saveUsers(users)
        return { id: newUser.id, nombre, apellido, email, telefono }
    }


    const login = ({ email, password }) => {
        const users = getUsers()
        const match = users.find(u => u.email === email && u.password === password)
        if (!match) { throw new Error('Usuario o contraseña inválidos.') }
        const sessionUser = { id: match.id, nombre: match.nombre, apellido: match.apellido, email: match.email }
        setUser(sessionUser)
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
        return sessionUser
    }


    const logout = () => {
        setUser(null)
        localStorage.removeItem(SESSION_KEY)
    }


    const value = { user, register, login, logout }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}