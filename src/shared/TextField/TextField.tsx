import {
  useState,
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
  useCallback,
} from "react";
import Box from "@/shared/Box/Box";
import "./TextField.css";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  icon?: ReactNode;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: boolean;
}

const TextField = ({
  placeholder = "Search",
  value,
  onChange,
  className,
  style,
  required = false,
  error = false,
  icon,
  ...rest
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState("");

  const isControlled = value !== undefined;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!isControlled) setInternalValue(value);

      if (onChange) onChange(value);
    },
    [isControlled, onChange]
  );
  return (
    <Box
      className={`textfield-container ${error ? "error" : ""} ${className}`}
      style={style}
    >
      {icon}
      <input
        type="text"
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        placeholder={required ? `${placeholder}*` : placeholder}
        className="textfield-input"
        {...rest}
      />
    </Box>
  );
};

export default TextField;
