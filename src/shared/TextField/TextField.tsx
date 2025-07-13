import {
  useState,
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
  useCallback,
  ElementType,
  forwardRef,
  Fragment,
} from "react";
import Box from "@/shared/Box/Box";
import "./TextField.css";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  icon?: ReactNode;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: boolean;
  inputClassName?: string;
  wrapperComponent?: ElementType;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      placeholder = "Search",
      value,
      onChange,
      className,
      style,
      required = false,
      error = false,
      icon,
      inputClassName,
      wrapperComponent: Wrapper = Box,
      ...rest
    },
    ref
  ) => {
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

    return Wrapper === Fragment ? (
      <>
        {icon}
        <input
          ref={ref}
          type="text"
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          placeholder={required ? `${placeholder}*` : placeholder}
          className={`textfield-input ${inputClassName || ""}`}
          {...rest}
        />
      </>
    ) : (
      <Wrapper
        className={`textfield-container ${error ? "error" : ""} ${className}`}
        style={style}
      >
        {icon}
        <input
          ref={ref}
          type="text"
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          placeholder={required ? `${placeholder}*` : placeholder}
          className={`textfield-input ${inputClassName || ""}`}
          {...rest}
        />
      </Wrapper>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
