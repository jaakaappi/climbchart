import { PropsWithChildren, CSSProperties } from "react";

type TextProps = {
  bold?: boolean;
  title?: boolean;
  style?: CSSProperties;
} & PropsWithChildren;

const titleStyle = {
  padding: 4,
  fontSize: 18,
};

export const Text = ({ children, bold, title, style }: TextProps) => {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        fontWeight: bold ? "bold" : "normal",
        ...(title ? titleStyle : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
