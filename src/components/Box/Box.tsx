import React from "react";

type BoxProps<T extends React.ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.ComponentProps<T>, "as" | "children" | "className" | "style">;

const Box = <T extends React.ElementType = "div">({
  as,
  children,
  className = "",
  style,
  ...rest
}: BoxProps<T>) => {
  const Component = as || "div";

  return (
    <Component className={className} style={style} {...rest}>
      {children}
    </Component>
  );
};

export default Box;
