/**
 * Compresses an image file using canvas.
 * Tries WebP first (30-50% smaller than JPEG), falls back to JPEG.
 *
 * @param file     - The image File to compress
 * @param maxPx    - Max width or height in pixels (default 1200)
 * @param quality  - Compression quality 0–1 (default 0.78)
 * @returns        - Promise resolving to a compressed base64 data URL
 */
export function compressImage(
  file: File,
  maxPx = 1200,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);

        // Try WebP first — much smaller for same quality
        const webp = canvas.toDataURL("image/webp", quality);

        // Safari < 14 returns a PNG when asked for WebP (starts with data:image/png)
        // In that case fall back to JPEG
        if (webp.startsWith("data:image/webp")) {
          resolve(webp);
        } else {
          resolve(canvas.toDataURL("image/jpeg", quality));
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
