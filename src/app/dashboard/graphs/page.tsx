"use client";

import GraphDisplay from "@/components/GraphDisplay";

export default function DashboardGraphsPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Visualização de Gráficos</h2>
      <p className="text-muted-foreground mb-6">
        Explore os dados através de gráficos interativos.
      </p>
      <GraphDisplay />
    </div>
  );
}
