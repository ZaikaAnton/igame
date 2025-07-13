import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ForwardedRef,
  forwardRef,
  JSX,
  ReactNode,
} from "react";

type BoxProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "style"
>;

const Box = forwardRef(function Box<T extends ElementType = "div">(
  props: BoxProps<T>,
  ref: ForwardedRef<any>
) {
  const { as: Component = "div", children, className, style, ...rest } = props;

  return (
    <Component ref={ref} className={className} style={style} {...rest}>
      {children}
    </Component>
  );
}) as <T extends ElementType = "div">(
  props: BoxProps<T> & { ref?: ForwardedRef<any> }
) => JSX.Element;

export default Box;
