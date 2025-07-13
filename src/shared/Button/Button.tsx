import {
  ReactNode,
  CSSProperties,
  useMemo,
  ComponentPropsWithoutRef,
  ElementType,
} from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "link";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "style" | "variant" | "size" | "disabled"
>;

const Button = <T extends ElementType = "button">({
  as,
  children,
  variant = "primary",
  size = "medium",
  className,
  style,
  disabled,
  ...rest
}: ButtonProps<T>) => {
  const Component = as || "button";

  const classes = useMemo(() => {
    return ["btn", `btn--${variant}`, `btn--${size}`, className]
      .filter(Boolean)
      .join(" ");
  }, [variant, size, className]);

  return (
    <Component className={classes} style={style} disabled={disabled} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
