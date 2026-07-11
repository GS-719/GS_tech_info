// app/register/page.tsx
import { RegisterForm } from "@/src/components/auth/registrationForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full bg-[#050506] flex items-center justify-center p-4 relative overflow-hidden isolate">
      
      {/* Ambient Gemini Mesh Backdrop */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] -translate-x-1/4 -translate-y-1/4 mix-blend-screen" />
        <div className="absolute w-[600px] h-[400px] rounded-full bg-purple-600/10 blur-[150px] translate-y-1/4 mix-blend-screen" />
      </div>

      {/* Render the Client Form Wrapper */}
      <div className="relative z-10 w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}