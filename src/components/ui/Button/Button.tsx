import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant =
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost";

type Size =
    | "sm"
    | "md"
    | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
        "bg-slate-700 text-white hover:bg-slate-800",

    danger:
        "bg-red-600 text-white hover:bg-red-700",

    outline:
        "border border-slate-300 bg-white hover:bg-slate-100",

    ghost:
        "bg-transparent hover:bg-slate-100",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
};

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    className = "",
    children,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                font-medium
                transition-all
                duration-200
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${className}
            `}
        >
            {loading ? (
                <Loader2
                    size={18}
                    className="animate-spin"
                />
            ) : (
                leftIcon
            )}

            {children}

            {!loading && rightIcon}
        </button>
    );
}