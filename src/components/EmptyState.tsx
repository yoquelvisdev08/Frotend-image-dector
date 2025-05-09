import React from 'react';

interface EmptyStateProps {
  message?: string;
  suggestion?: string;
}

export const EmptyState = ({ 
  message = "No se encontraron imágenes",
  suggestion = "Intenta con otra URL o verifica que el sitio sea accesible"
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="text-6xl mb-4">🖼️</div>
      <h3 className="text-2xl font-semibold text-neutral-900">{message}</h3>
      <p className="text-neutral-500 max-w-md">{suggestion}</p>
    </div>
  );
}; 