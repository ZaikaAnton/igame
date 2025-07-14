import React, {
  ReactNode,
  CSSProperties,
  ElementType,
  ComponentPropsWithoutRef,
} from "react";
import "./Typography.css";

type TextClass = "text-14-600" | "text-14-700" | "text-16-700" | "text-12-400";

type TypographyProps<T extends ElementType = "p"> = {
  as?: T;
  children: ReactNode;
  variantClass?: TextClass;
  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "style" | "variantClass"
>;

const Typography = <T extends React.ElementType = "p">({
  as,
  children,
  variantClass,
  style,
  className,
  ...rest
}: TypographyProps<T>) => {
  const Component = as || "p";

  return (
    <Component
      className={[variantClass, className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Typography;
