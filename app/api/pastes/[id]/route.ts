import { redis } from "@/lib/redis";
import { getNow } from "@/lib/now";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX
  const now = getNow(req);

  const key = `paste:${id}`;
  const paste = await redis.get<any>(key);

  // Missing paste
  if (!paste) {
    return Response.json({ error: "Paste not found" }, { status: 404 });
  }

  // Expired
  if (paste.expires_at && now >= paste.expires_at) {
    return Response.json({ error: "Paste expired" }, { status: 404 });
  }

  // View limit exceeded
  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return Response.json({ error: "View limit exceeded" }, { status: 404 });
  }

  // Increment views
  paste.views += 1;
  await redis.set(key, paste);

  return Response.json({
    content: paste.content,
    remaining_views:
      paste.max_views === null ? null : paste.max_views - paste.views,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null,
  });
}
