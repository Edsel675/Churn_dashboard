"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, LineChart, Users } from "lucide-react"
import { useNavigation } from "@/contexts/navigation-context"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MainNavbar() {
  const { activeSection, setActiveSection } = useNavigation()

  const navItems = [
    {
      id: "dashboard" as const,
      label: "Panel Principal",
      icon: BarChart3,
    },
    {
      id: "analysis" as const,
      label: "Análisis Detallado",
      icon: LineChart,
    },
    {
      id: "clients" as const,
      label: "Clientes en Riesgo",
      icon: Users,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Image
            src="/danu-logo.png"
            alt="Danu Analítica"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={cn("gap-2", isActive && "shadow-md")}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
