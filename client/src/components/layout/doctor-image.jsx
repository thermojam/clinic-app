import React from "react";

export const DoctorImage = ({ src = "/doc.png", alt = "Улыбающийся врач" }) => {
    return (
        <div
            className="hidden md:flex absolute right-0 bottom-0 w-1/2 h-full items-end justify-end pointer-events-none select-none"
        >
            <img
                src={src}
                alt={alt}
                className="w-[500px] max-w-full object-contain animate-fadeIn"
            />
        </div>
    );
};
