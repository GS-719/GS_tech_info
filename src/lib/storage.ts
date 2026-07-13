// src/lib/storage.ts
import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.SUPABASE_ACCESS_KEY_ID || !process.env.SUPABASE_SECRET_ACCESS_KEY || !process.env.SUPABASE_ENDPOINT) {
  throw new Error("Missing critical Supabase Storage environment configurations in .env");
}

export const storageClient = new S3Client({
  // Supabase S3 API layer expects standard regional placeholders
  region: "ap-southeast-1", 
  endpoint: process.env.SUPABASE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY,
  },
  // Forces the SDK to construct standard cloud paths properly
  forcePathStyle: true, 
});

export const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || "draft_content";