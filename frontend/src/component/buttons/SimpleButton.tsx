import React from 'react';

interface SimpleButtonProps {
    label: string
    onChange: () => void
    color?: 'red' | 'blue' | 'indigo'
    icon?: React.ReactElement
}

const SimpleButton: React.FC<SimpleButtonProps> = ({label, onChange, color, icon}) => {
    let bgColorCss = 'bg-blue-300'
    if (color === 'red') {
        bgColorCss = 'bg-red-300'
    } else if (color === 'indigo') {
        bgColorCss = 'bg-indigo-300'
    }

    return (
        <button className={`w-full h-12 rounded ${bgColorCss}`} onClick={onChange}>
            <div className={'flex gap-3 justify-center items-center'}>
                {icon}
                {label}
            </div>
        </button>
    );
};


export default SimpleButton;