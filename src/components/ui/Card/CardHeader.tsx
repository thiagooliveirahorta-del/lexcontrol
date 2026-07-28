import type { ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function CardHeader({
  children,
  className = "",
}: CardHeaderProps) {
  return (
    <div
      className={[
        "mb-4 flex items-center justify-between border-b border-slate-200 pb-3",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}