import { PropsWithChildren } from "react";

type FlexContainerProps = {
  direction?: "row" | "column";
  gap?: number;
  style?: React.CSSProperties;
} & PropsWithChildren;

export const FlexContainer = ({
  children,
  direction,
  gap,
  style,
}: FlexContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction ?? "row",
        gap: gap ?? 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
