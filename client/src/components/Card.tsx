import { CSSProperties, PropsWithChildren } from "react";

type CardProps = { style?: CSSProperties } & PropsWithChildren;

export const Card = ({ children, style }: CardProps) => {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "4px",
        ...style,
        boxShadow: "0 2px 4px rgb(0 0 0 / 0.2)",
      }}
    >
      {children}
    </div>
  );
};
