import { PropsWithChildren } from "react";

type FlexContainerProps = {
  style?: React.CSSProperties;
} & PropsWithChildren;

export const FlexContainer = ({ children, style }: FlexContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
