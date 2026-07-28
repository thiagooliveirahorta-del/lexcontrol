import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

const variantMap = {
  default: "bg-white border border-slate-200 shadow-sm",
  outlined: "bg-white border-2 border-slate-300",
  elevated: "bg-white shadow-lg border border-slate-200",
};

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hover = false,
}: CardProps) {
  return (
    <div
      className={[
        "rounded-xl transition-all duration-200",
        variantMap[variant],
        paddingMap[padding],
        hover ? "hover:-translate-y-1 hover:shadow-xl" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}