import Head from "next/head";
import { Manrope } from "next/font/google";
import type { GetServerSideProps } from "next";
import RenderingNav from "@/components/rendering/RenderingNav";
import { normalizeEvents, type CommunityEvent } from "@/data/communityEvents";
import { retrieveCollection } from "@/utils/db/servicefirebase";
import styles from "@/styles/rendering-pages.module.css";

type SSRPageProps = {
  events: CommunityEvent[];
  generatedAt: string;
};

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(value));

const SSRPage = ({ events, generatedAt }: SSRPageProps) => {
  return (
    <>
      <Head>
        <title>SSR - Daftar Event</title>
      </Head>
      <section className={`${styles.page} ${manrope.className}`.trim()}>
        <p className={styles.kicker}>Server Side Rendering</p>
        <h1 className={styles.title}>SSR: Agenda Event Mingguan</h1>
        <p className={styles.description}>
          Data event dirender di server setiap request, sehingga pengguna menerima HTML yang sudah lengkap.
        </p>

        <RenderingNav />

        <div className={styles.list}>
          {events.length === 0 && (
            <p className={styles.empty}>Belum ada data event di Firestore.</p>
          )}
          {events.map((event) => (
            <article key={event.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{event.title}</h2>
              <p className={styles.cardMeta}>
                {formatDate(event.date)} • {event.location} • {event.speaker}
              </p>
              <p className={styles.cardSummary}>{event.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRPageProps> = async () => {
  let events: CommunityEvent[] = [];

  try {
    const rawData = await retrieveCollection("events");
    events = normalizeEvents(rawData as Record<string, unknown>[]);
  } catch (error) {
    console.error("Error in SSR events:", error);
  }

  return {
    props: {
      events,
      generatedAt: new Date().toISOString(),
    },
  };
};

export default SSRPage;
