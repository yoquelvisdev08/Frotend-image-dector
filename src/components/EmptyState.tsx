import React from 'react';
import '../styles/EmptyState.css';

interface EmptyStateProps {
  message?: string;
  suggestion?: string;
}

export const EmptyState = ({ 
  message = "No se encontraron imágenes",
  suggestion = "Intenta con otra URL o verifica que el sitio sea accesible"
}: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🖼️</div>
      <h3>{message}</h3>
      <p>{suggestion}</p>
    </div>
  );
}; 