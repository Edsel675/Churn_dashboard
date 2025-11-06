"use client"
import { BarChart3, Users, LineChartIcon } from "lucide-react"

type NavSection = "dashboard" | "analysis" | "customers"

interface MainNavbarProps {
  activeSection: NavSection
  onSectionChange: (section: NavSection) => void
}

export function MainNavbar({ activeSection, onSectionChange }: MainNavbarProps) {
  const navItems = [
    { id: "dashboard", label: "Panel Principal", icon: BarChart3 },
    { id: "analysis", label: "Análisis Detallado", icon: LineChartIcon },
    { id: "customers", label: "Clientes en Riesgo", icon: Users },
  ] as const

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8 h-16">
          <div className="font-bold text-lg text-foreground">Churn Dashboard</div>

          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id as NavSection)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
