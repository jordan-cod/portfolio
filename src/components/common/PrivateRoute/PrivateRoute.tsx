import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router";
import React, {ReactNode} from "react";

interface RequireAuthProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<RequireAuthProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth?.user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};