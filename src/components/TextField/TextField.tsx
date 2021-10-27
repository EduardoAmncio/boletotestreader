import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";

interface TextFieldProps {
  multiline?: boolean;
  type?: "number" | "password";
  error?: boolean;
  rows?: string;
  helperText?: string;
  placeholder?: string;
  label: string;
  value: string;
  inputMode?:
  | "none"
  | "text"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal"
  | "search";
  startAdornment?: React.ReactNode;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  type,
  multiline,
  error,
  rows,
  helperText,
  placeholder,
  label,
  value,
  inputMode,
  startAdornment,
  minValue,
  maxValue,
  disabled,
  onChange,
}: TextFieldProps) => {
  return (
    <MuiTextField
      multiline={multiline}
      rows={rows}
      type={type}
      error={error}
      color="primary"
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      value={value}
      helperText={helperText}
      variant="outlined"
      inputMode={inputMode}
      InputProps={{
        startAdornment,
      }}
      inputProps={{
        step: type === "number" ? 0.1 : undefined,
        min: minValue,
        max: maxValue,
        inputMode,
      }}
      fullWidth
      required
      onChange={onChange}
    />
  );
};
