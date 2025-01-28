'use client'

import { createContext, use } from 'react'
import { DataContextProps, DataProviderProps } from '@/providers/data-provider/data-provider.type'

const DataContext = createContext<DataContextProps | null>(null)

export function useData() {
  const CONTEXT = use(DataContext)
  if (!CONTEXT) {
    throw new Error('You must wrapper DataProvider to use DataContext')
  }
  return CONTEXT
}

export function DataProvider(props: DataProviderProps) {
  const { children, data } = props
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  )
}
