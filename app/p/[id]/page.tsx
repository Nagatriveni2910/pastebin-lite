type PasteResponse = {
  content: string;
  remaining_views: number | null;
  expires_at: string | null;
};

async function fetchPaste(id: string): Promise<PasteResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ IMPORTANT FIX

  const paste = await fetchPaste(id);

  if (!paste) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Paste not found or expired</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Paste</h2>
      <pre>{paste.content}</pre>

      <p>
        Remaining views:{" "}
        {paste.remaining_views === null ? "Unlimited" : paste.remaining_views}
      </p>

      <p>
        Expires at:{" "}
        {paste.expires_at
          ? new Date(paste.expires_at).toLocaleString()
          : "Never"}
      </p>
    </div>
  );
}
