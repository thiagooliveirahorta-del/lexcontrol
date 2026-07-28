import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
    return <>{children}</>;
}