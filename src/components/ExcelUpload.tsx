"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExcelUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setMessage('');
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Por favor, selecione um arquivo Excel para upload.');
      return;
    }

    setLoading(true);
    setMessage('Enviando arquivo...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload-excel', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Arquivo processado com sucesso!');
        setSelectedFile(null); // Clear selected file after successful upload
      } else {
        setMessage(data.error || 'Erro ao processar o arquivo.');
      }
    } catch (error: any) {
      setMessage(`Erro na rede: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload de Arquivo Excel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="excel-file">Arquivo Excel</Label>
          <Input id="excel-file" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        </div>
        <Button onClick={handleUpload} disabled={!selectedFile || loading}>
          {loading ? 'Processando...' : 'Upload e Processar'}
        </Button>
        {message && <p className={`text-sm ${message.startsWith('Erro') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      </CardContent>
    </Card>
  );
};

export default ExcelUpload;
