"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE;
    const url = `${base}/allcustomers`;
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>
        Customer List
      </h1>

      {!data && !error && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {Array.isArray(data) && data.length > 0 ? (
        <ul>
          {data.map((c) => (
            <li key={c.customer_id}>
              {c.customer_name}（{c.age}歳 / {c.gender}） — ID: {c.customer_id}
            </li>
          ))}
        </ul>
      ) : (
        data && <p>データがありません</p>
      )}
    </main>
  );
}
