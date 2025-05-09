import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = 'Escaneando sitio...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      {message && (
        <p className="text-lg text-neutral-700 font-medium">{message}</p>
      )}
    </div>
  );
}; 