"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ClientProvidersProps {
    children: ReactNode;
    session: any;
}

export default function ClientProviders({
    children,
    session,
}: ClientProvidersProps) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
