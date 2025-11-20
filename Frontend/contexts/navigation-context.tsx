"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type NavSection = "dashboard" | "analysis" | "clients"

type NavigationContextType = {
  activeSection: NavSection
  setActiveSection: (section: NavSection) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<NavSection>("dashboard")

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider")
  }

  return context
}
