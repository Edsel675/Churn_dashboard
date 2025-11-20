"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type DateRange = {
  from: Date
  to: Date
}

export type FilterState = {
  dateRange: DateRange
  segment: "all" | "basico" | "estandar" | "premium" | "vip"
  contractType: "all" | "mensual" | "trimestral" | "anual"
  riskLevel: "all" | "high" | "medium" | "low"
}

type FilterContextType = {
  filters: FilterState
  updateFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const getDefaultDateRange = (): DateRange => {
  const to = new Date()
  const from = new Date()
  from.setMonth(from.getMonth() - 6) // Últimos 6 meses por defecto
  return { from, to }
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: getDefaultDateRange(),
    segment: "all",
    contractType: "all",
    riskLevel: "all",
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      dateRange: getDefaultDateRange(),
      segment: "all",
      contractType: "all",
      riskLevel: "all",
    })
  }

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider")
  }
  return context
}


