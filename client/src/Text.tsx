import { PropsWithChildren } from "react";

type TextProps = {} & PropsWithChildren;

export const Text = ({ children }: TextProps) => {
  return <div style={{ fontFamily: "sans-serif" }}>{children}</div>;
};
