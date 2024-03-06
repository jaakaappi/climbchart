import { PropsWithChildren } from "react";

type TextProps = { bold?: boolean; title?: boolean } & PropsWithChildren;

const titleStyle = {
  padding: 4,
  fontSize: 18,
};

export const Text = ({ children, bold, title }: TextProps) => {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        fontWeight: bold ? "bold" : "normal",
        ...(title ? titleStyle : {}),
      }}
    >
      {children}
    </div>
  );
};
