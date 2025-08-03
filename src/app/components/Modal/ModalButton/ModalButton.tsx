import React from "react";

interface ModalButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export const ModalButton = ({children, onClick, disabled}: ModalButtonProps) => (
    <button className="w-full rounded-lg p-2 cursor-pointer bg-[#2F3454] text-white hover:bg-[#111D4A]
    transition-colors duration-200 mt-4" onClick={onClick} disabled={disabled}>
        {children}
    </button>
)