'use client';

import { useState } from 'react';
import { Button, CircularProgress, Card, CardContent, TextField, Typography } from '@mui/material';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5050/api/ocr', {
        method: 'POST',
        body: formData,
        // NE PAS mettre 'Content-Type': 'multipart/form-data' - le navigateur le fera automatiquement
        // avec le bon boundary
        credentials: 'include' // Si vous utilisez des cookies/sessions
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la requête');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analyse d'Ordonnance</h1>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Téléchargez l'image de l'ordonnance pour analyse.
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)}
              fullWidth
              variant="outlined"
              margin="normal"
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || !file}
            >
              {loading ? <CircularProgress size={24} /> : 'Envoyer'}
            </Button>
          </form>

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              Erreur : {error}
            </Typography>
          )}

          {result && (
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Résultat JSON :
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
