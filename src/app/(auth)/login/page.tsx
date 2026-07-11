import { LoginForm } from "@/src/components/auth/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#050506] flex items-center justify-center p-4 relative overflow-hidden isolate">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] -translate-x-1/3 mix-blend-screen" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] translate-x-1/3 mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Suspense handles standard sub-component useSearchParams hydration hooks safely */}
        <Suspense fallback={<div className="text-sm text-muted-foreground text-center">Loading interface configuration...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}