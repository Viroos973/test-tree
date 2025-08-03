import React, {useEffect} from "react";
import {X} from "lucide-react"
import ReactDOM from "react-dom";

interface ModalProps {
    showModal: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title: string;
}

export const Modal = ({showModal, onClose, title, children}: ModalProps) => {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (showModal) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, showModal])

    if (!showModal) return null;

    const modalContent = (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="min-w-[400px] max-w-[calc(100vw-32px)]">
                <div className="w-full rounded-lg bg-[#FFF8F0] p-4 flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold">{title}</p>
                        <button className="cursor-pointer" onClick={onClose}>
                            <X/>
                        </button>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

    let modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
    }

    return ReactDOM.createPortal(
        modalContent,
        modalRoot
    );
}