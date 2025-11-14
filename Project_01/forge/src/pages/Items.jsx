import { useEffect, useState } from "react";
import s from "../styles/items.module.scss";
import { api } from "../utils/rest";

export default function Items() {
  const [status, setStatus] = useState("Loading items...");
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getItems()
      .then((data) => {
        const list = data?.items ?? [];
        setItems(list);
        setCount(data?.count ?? list.length);
        setStatus("OK");
      })
      .catch((e) => {
        setError(e.message || "Failed to load items");
        setStatus("Error");
      });
  }, []);

  return (
    <div className={s.page}>
      <div className={s.container}>
        <header className={s.header}>
          <h1 className={s.title}>Items (FastAPI)</h1>
          <p className={s.subtle}>
            Status: {status} {error && <span className={s.error}>— {error}</span>}
          </p>
        </header>

        {/* Summary metric */}
        <section className={s.section}>
          <div className={s.metricsGrid}>
            <div className={s.metricCard}>
              <p className={s.metricLabel}>Total Items</p>
              <p className={s.metricValue}>{count}</p>
            </div>
          </div>
        </section>

        {/* Item cards */}
        <section className={s.section}>
          <div className={s.grid}>
            {items.map((i) => (
              <div key={i.id} className={s.itemCard}>
                <div className={s.itemHeader}>
                  <h2 className={s.itemName}>{i.name}</h2>
                  <span className={`${s.badge} ${i.in_stock ? s.badgeIn : s.badgeOut}`}>
                    {i.in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className={s.itemMeta}>ID: {i.id}</div>
                <div className={s.price}>${i.price}</div>
              </div>
            ))}
          </div>

          {items.length === 0 && !error && (
            <p className={s.subtle}>No items to display.</p>
          )}
        </section>
      </div>
    </div>
  );
}