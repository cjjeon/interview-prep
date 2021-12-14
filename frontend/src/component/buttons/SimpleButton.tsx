import React from 'react';

interface SimpleButtonProps {
    label: string
    onClick: () => void
    color?: 'red' | 'blue' | 'indigo' | 'yellow' | 'transparent'
    borderColor?: 'none' | 'gray'
    icon?: React.ReactElement
}

const SimpleButton: React.FC<SimpleButtonProps> = ({label, onClick, color, borderColor = 'none', icon}) => {
    let bgColorCss = 'bg-blue-300'
    if (color === 'red') {
        bgColorCss = 'bg-red-300'
    } else if (color === 'indigo') {
        bgColorCss = 'bg-indigo-300'
    } else if (color === 'yellow') {
        bgColorCss = 'bg-yellow-300'
    } else if (color === 'transparent') {
        bgColorCss = 'bg-transparent'
    }

    let borderCss = ''
    if (borderColor === 'gray') {
        borderCss = 'border-2 border-gray-400'
    }

    return (
        <button className={`w-full h-12 rounded ${bgColorCss} ${borderCss}`} onClick={onClick}>
            <div className={'flex gap-3 justify-center items-center'}>
                {icon}
                {label}
            </div>
        </button>
    );
};


export default SimpleButton;