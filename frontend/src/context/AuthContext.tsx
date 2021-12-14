import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../api/supabase"
import { Provider, User } from "@supabase/supabase-js"
import { toast } from "react-toastify"

interface IAuthContext {
    isLoggedIn: boolean
    user: User | null
    login: (email?: string, password?: string, provider?: Provider) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    user: null,
    login: (email?: string, password?: string, provider?: Provider) => {
        return new Promise((resolve) => {})
    },
    logout: () => null,
})

export function useAuth(): IAuthContext {
    return useContext(AuthContext)
}

export const Auth: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const user = supabase.auth.user()
        setUser(user)
        setIsLoading(false)
    }, [])

    const login = async (email?: string, password?: string, provider?: Provider) => {
        return supabase.auth
            .signIn({
                email,
                password,
                provider,
            })
            .then(({ user, error }) => {
                if (error) {
                    toast.error(error.message)
                } else {
                    setUser(user)
                }
            })
    }

    const logout = () => {
        supabase.auth
            .signOut()
            .then(() => {
                setUser(null)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    if (isLoading) {
        return <div>Loading....</div>
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
