import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

type BoxProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "style"
>;

const Box = <T extends ElementType = "div">({
  as,
  children,
  className,
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
