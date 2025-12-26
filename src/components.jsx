import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800', green: 'bg-green-100 text-green-800', yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800', red: 'bg-red-100 text-red-800', purple: 'bg-purple-100 text-purple-800',
    indigo: 'bg-indigo-100 text-indigo-800', orange: 'bg-orange-100 text-orange-800'
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[color] || colors.blue}`}>{children}</span>;
};

export const GradeBadge = ({ grade }) => {
  const color = { 'S': 'purple', 'A': 'green', 'B': 'blue', 'C': 'yellow', 'D': 'red' }[grade] || 'gray';
  return <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm bg-${color}-100 text-${color}-700 border border-${color}-200`}>{grade}</span>;
};

// Toast Notification
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className={`pointer-events-auto flex items-center p-4 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}>
                        {t.type === 'success' ? <CheckCircle size={16} className="mr-2"/> : <AlertCircle size={16} className="mr-2"/>}
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        // Fallback for when hook is used outside of provider context in early renders or tests
        return () => {};
    }
    return context;
};
