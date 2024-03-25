// ToastContainer.jsx
import React from 'react';
import { useAtom } from 'jotai';
import {toastListAtom} from "../../state/atoms/application.state.atoms.ts";

const ToastContainer = () => {
    const [toasts] = useAtom(toastListAtom);

    return (
        <div className="fixed bottom-0 right-0 p-4 space-y-2">
            {toasts.map((toast: any) => (
                <div key={toast.id} className="toast toast-end">
                    <div className={`alert alert-${toast.type}`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
