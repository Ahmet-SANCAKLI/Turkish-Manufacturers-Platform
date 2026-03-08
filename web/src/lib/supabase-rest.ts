function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase env vars are missing");
  }

  return { url, key };
}

export async function fetchFromSupabase<T>(path: string): Promise<T> {
  const { url, key } = getSupabaseConfig();

  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Supabase request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function insertIntoSupabase(table: string, payload: unknown) {
  const { url, key } = getSupabaseConfig();

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Supabase insert failed: ${res.status}`);
  }
}

export async function patchSupabase(path: string, payload: unknown) {
  const { url, key } = getSupabaseConfig();

  const res = await fetch(`${url}/rest/v1/${path}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Supabase update failed: ${res.status}`);
  }
}
