"use client"

import { FilterProvider } from "@/contexts/filter-context"
import { NavigationProvider } from "@/contexts/navigation-context"
import { DashboardFilters } from "@/components/filters/dashboard-filters"
import { InsightsSidebar } from "@/components/layout/insights-sidebar"
import { MainNavbar } from "@/components/main-navbar"
import { DashboardContent } from "@/components/dashboard-content"

export default function Home() {
  return (
    <NavigationProvider>
      <FilterProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <MainNavbar />

          <div className="flex flex-1">
            <InsightsSidebar />

            <main className="flex-1">
              <div className="sticky top-16 z-40 bg-background border-b">
                <div className="px-6 py-4">
                  <DashboardFilters />
                </div>
              </div>

              <DashboardContent />
            </main>
          </div>
        </div>
      </FilterProvider>
    </NavigationProvider>
  )
}
