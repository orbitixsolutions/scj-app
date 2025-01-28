'use client'

import { createContext, use } from 'react'
import { AuthContextProps, AuthProviderProps } from '@/providers/auth-provider/auth-provider.type'

const AuthContext = createContext<AuthContextProps | null>(null)

export function useAuth() {
    const CONTEXT = use(AuthContext)
    if (!CONTEXT) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return CONTEXT
}

export function AuthProvider(props: AuthProviderProps) {
  const { children, user } = props
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
