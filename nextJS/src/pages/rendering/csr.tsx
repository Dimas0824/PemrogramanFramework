import Head from "next/head";
import { Manrope } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import RenderingNav from "@/components/rendering/RenderingNav";
import type { CommunityEvent } from "@/data/communityEvents";
import styles from "@/styles/rendering-pages.module.css";

type EventResponse = {
  data: CommunityEvent[];
  total: number;
  generatedAt: string;
};

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(value));

const CSRPage = () => {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Gagal memuat data event.");
        }

        const payload: EventResponse = await response.json();
        setEvents(payload.data);
        setGeneratedAt(payload.generatedAt);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    void loadEvents();
  }, []);

  const updateLabel = useMemo(() => {
    if (!generatedAt) return "-";
    return new Date(generatedAt).toLocaleString("id-ID");
  }, [generatedAt]);

  return (
    <>
      <Head>
        <title>CSR - Daftar Event</title>
      </Head>
      <section className={`${styles.page} ${manrope.className}`.trim()}>
        <p className={styles.kicker}>Client Side Rendering</p>
        <h1 className={styles.title}>CSR: Daftar Event Komunitas</h1>
        <p className={styles.description}>
          Data event dimuat di browser setelah halaman terbuka menggunakan fetch ke API internal.
        </p>

        <RenderingNav />

        {loading && <p className={styles.status}>Memuat data event...</p>}
        {!loading && error && <p className={styles.error}>{error}</p>}

        {!loading && !error && (
          <div className={styles.list}>
            {events.length === 0 && (
              <p className={styles.empty}>Belum ada data event di Firestore.</p>
            )}
            {events.map((event) => (
              <article key={event.id} className={styles.card}>
                <h2 className={styles.cardTitle}>{event.title}</h2>
                <p className={styles.cardMeta}>
                  {formatDate(event.date)} • {event.location} • {event.category}
                </p>
                <p className={styles.cardSummary}>{event.summary}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CSRPage;
