"use client";

import ExcelUpload from "@/components/ExcelUpload";

export default function DashboardExcelUploadPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Upload de Dados Excel</h2>
      <p className="text-muted-foreground mb-6">
        Faça o upload do seu ficheiro Excel para importar dados para o sistema.
      </p>
      <ExcelUpload />
    </div>
  );
}
