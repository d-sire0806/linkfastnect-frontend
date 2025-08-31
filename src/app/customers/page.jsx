"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCustomers } from "./fetchCustomers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "fetch error");
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/customers/create">
          <button
            style={{
              background: "#cfe3ff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Create
          </button>
        </Link>
      </div>

      {error && (
        <p style={{ color: "crimson", marginBottom: 12 }}>Error: {error}</p>
      )}

      {customers === null && !error && <p>Loading...</p>}

      {Array.isArray(customers) && customers.length === 0 && !error && (
        <p>顧客情報がありません。</p>
      )}

      {Array.isArray(customers) && customers.length > 0 && (
        <ul style={{ lineHeight: 1.9 }}>
          {customers.map((c) => (
            <li key={c.customer_id}>
              {c.customer_name}（{c.age}歳 / {c.gender}） — ID: {c.customer_id}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

