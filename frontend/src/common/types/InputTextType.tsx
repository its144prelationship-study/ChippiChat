export interface InputTextProps {
    label: string;
    valid: boolean;
    placeholder: string;
    spellCheck: boolean;
    value: string;
    handleOnChange: (value: string) => void;
}