import { supabase } from "../../lib/supabase";
import { compressImage } from "./compressImage";

const BUCKET = "site-images";

/**
 * Compresses an image file and uploads it to Supabase Storage.
 * Returns the public URL, or throws on failure.
 */
export async function uploadImage(
  file: File,
  folder: string,
  maxPx = 1200,
  quality = 0.78
): Promise<string> {
  const compressed = await compressImage(file, maxPx, quality);

  // Convert base64 data URL to Blob
  const res = await fetch(compressed);
  const blob = await res.blob();

  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, blob, { contentType: blob.type, upsert: false });

  if (error) throw new Error("Upload failed: " + error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}
