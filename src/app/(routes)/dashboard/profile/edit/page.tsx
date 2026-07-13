import { redirect } from "next/navigation";
import { fetchProfileEditorData } from "@/src/app/actions/dashboard/profile";
import { EditProfileForm } from "@/src/components/profile/editProfileForm";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfileEditPage() {
    const userData = await fetchProfileEditorData();

    if (!userData) {
        redirect("/login");
    }

    return (
        <>
            <main className="flex-1 bg-[#050506] text-white min-h-[calc(100vh-4rem)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                    {/* Back Button Navigation Header Link */}
                    <div className="mb-6">
                        <Link href="/dashboard/profile">
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white border-none bg-transparent hover:bg-white/5">
                                <ArrowLeft className="w-4 h-4" /> Cancel and Return
                            </Button>
                        </Link>
                    </div>

                    {/* Section Header */}
                    <div className="pb-8 border-b border-border/40 mb-8">
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Configure Workspace</h1>
                        <p className="text-lg text-muted-foreground">
                            Modify public developer fields, theme metrics, and dashboard language settings.
                        </p>
                    </div>

                    {/* Render the Client Input Form */}
                    <div className="py-2">
                        <EditProfileForm initialData={userData} />
                    </div>

                </div>
            </main>
        </>
    );
}