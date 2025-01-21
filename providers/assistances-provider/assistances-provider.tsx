'use client'

import {  InitialAssistances } from '@prisma/client'
import { createContext, use } from 'react'

type AssistancesContextType = {
  initialAssistances: InitialAssistances[]
}

const AsistancesContext = createContext<AssistancesContextType | null>(null)

export function useAssistances() {
  const CONTEXT = use(AsistancesContext)
  if (!CONTEXT) {
    throw new Error('useAssistances must be used within a AssistancesProvider')
  }
  return CONTEXT
}

export function AssistancesProvider({
  children,
  initialAssistances,
}: {
  children: React.ReactNode
  initialAssistances: InitialAssistances[]
}) {
  return (
    <AsistancesContext.Provider value={{ initialAssistances }}>
      {children}
    </AsistancesContext.Provider>
  )
}
