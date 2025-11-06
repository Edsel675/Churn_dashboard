import { AnalysisTabsSection } from "@/components/analysis-tabs-section"

export function AnalysisSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Análisis Detallado</h2>
        <p className="text-muted-foreground">Explora segmentaciones profundas de tus datos de churn</p>
      </div>
      <AnalysisTabsSection />
    </div>
  )
}
