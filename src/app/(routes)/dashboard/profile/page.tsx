import { redirect } from "next/navigation";
import { fetchProfileFullData } from "@/src/app/actions/dashboard/profile";
import { ProfileClientForm } from "@/src/components/dashboard/ProfileClientForm";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
    const userData = await fetchProfileFullData();

    if (!userData) {
        redirect("/login");
    }

    return (
        <>
            <main className="flex-1 bg-[#050506] text-white min-h-[calc(100vh-4rem)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                    {/* Back Navigation Bar Control Row */}
                    <div className="mb-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="w-4 h-4" /> Return to Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* Profile Context Section Header */}
                    <div className="pb-8 border-b border-border/40 mb-8">
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Account Workspace</h1>
                        <p className="text-lg text-muted-foreground">
                            Review platform settings, security permissions, and update public meta-identities.
                        </p>
                    </div>

                    {/* Form Node Presentation Container */}
                    <div className="py-2">
                        <ProfileClientForm initialData={userData} />
                    </div>

                </div>
            </main>
        </>
    );
} 