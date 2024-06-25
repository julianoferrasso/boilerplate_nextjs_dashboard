// components/MaskedInput.tsx
import React from 'react';
import InputMask from 'react-input-mask';

interface MaskedInputProps {
    mask: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const MaskedInput: React.FC<MaskedInputProps> = ({ mask, value, onChange, placeholder, className }) => {
    return (
        <InputMask mask={mask} value={value} onChange={onChange}>
            {(inputProps) => <input {...inputProps} placeholder={placeholder} className={className} />}
        </InputMask>
    );
};

export default MaskedInput;
