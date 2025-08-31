// src/app/customers/fetchCustomers.js
export async function fetchCustomers() {
  // NEXT_PUBLIC_ と _なし の両方に対応させておく（環境に依存しないように）
  const base =
    process.env.NEXT_PUBLIC_API_BASE ||
    process.env.NEXT_PUBLIC_API_ENDPOINT ||
    process.env.API_BASE ||
    "";

  if (!base) {
    throw new Error("API base URL is not set. Set NEXT_PUBLIC_API_BASE in .env.local");
  }

  const res = await fetch(`${base}/allcustomers`, {
    // 開発時にキャッシュで空が残らないように
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
}
