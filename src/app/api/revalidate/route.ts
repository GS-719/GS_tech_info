import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get("secret");
        const slug = searchParams.get("slug");
        const type = searchParams.get("type"); // Expects 'article' or 'guide'

        // 1. Fixed Environment Key: Validates using the true token inside your .env file
        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json({ message: "Invalid verification token signature" }, { status: 401 });
        }

        if (!slug || !type) {
            return NextResponse.json({ message: "Missing vital query parameters" }, { status: 400 });
        }

        const cleanSlug = String(slug);
        const contentType = String(type).toLowerCase();

        // 2. Clear the high-performance fetch data cache tag
        revalidateTag(`content-node-${cleanSlug}`);

        // 3. Clear the App Router layout page views cache
        revalidatePath(`/${contentType}s`);
        revalidatePath(`/${contentType}s/${cleanSlug}`);

        console.log(`[Cache Engine]: Pinpoint purge successful for tag: content-node-${cleanSlug}`);

        return NextResponse.json({
            revalidated: true,
            tag: `content-node-${cleanSlug}`,
            time: Date.now()
        });
    } catch (error) {
        console.error("Critical Failure inside App Router Revalidation Handler:", error);
        return NextResponse.json({ message: "Internal revalidation drop fault" }, { status: 500 });
    }
}