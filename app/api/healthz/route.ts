import { redis } from "@/lib/redis";

export async function GET() {
  try {
    // simple redis ping to verify persistence
    await redis.ping();

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false }, { status: 500 });
  }
}
