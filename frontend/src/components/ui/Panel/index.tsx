import { ReactNode } from "react";

interface TProps {
  readonly children: ReactNode;
  className?: string;
}

function Panel({ children, className = "" }: TProps) {
  return <div className={"panel " + className}>{children}</div>;
}
export default Panel;
