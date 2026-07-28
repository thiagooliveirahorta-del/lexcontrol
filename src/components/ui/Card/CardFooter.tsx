import type { ReactNode } from "react";

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export default function CardFooter({
  children,
  className = "",
}: CardFooterProps) {
  return (
    <div
      className={[
        "mt-5 border-t border-slate-200 pt-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}