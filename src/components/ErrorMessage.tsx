import React from 'react';
// import '../styles/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-accent-error/10 border border-accent-error rounded-lg my-4">
      <div className="text-2xl">⚠️</div>
      <p className="text-accent-error text-base font-medium m-0">{message}</p>
    </div>
  );
}; 