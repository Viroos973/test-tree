import React from "react";

interface FooterButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export const FooterButton = ({children, onClick}: FooterButtonProps) => (
    <button className="cursor-pointer flex-1 px-4 py-2 bg-[#2F3454] text-white hover:bg-[#111D4A]
    transition-colors duration-200" onClick={onClick}>
        {children}
    </button>
)