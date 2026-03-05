import Head from "next/head";
import { Manrope } from "next/font/google";
import type { GetStaticProps } from "next";
import RenderingNav from "@/components/rendering/RenderingNav";
import { normalizeEvents, type CommunityEvent } from "@/data/communityEvents";
import { retrieveCollection } from "@/utils/db/servicefirebase";
import styles from "@/styles/rendering-pages.module.css";

type SSGPageProps = {
  events: CommunityEvent[];
  generatedAt: string;
};

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(value));

const SSGPage = ({ events, generatedAt }: SSGPageProps) => {
  return (
    <>
      <Head>
        <title>SSG - Daftar Event</title>
      </Head>
      <section className={`${styles.page} ${manrope.className}`.trim()}>
        <p className={styles.kicker}>Static Site Generation</p>
        <h1 className={styles.title}>SSG: Informasi Event Publik</h1>
        <p className={styles.description}>
          Halaman ini dibuat saat build time (static) dan diperbarui berkala menggunakan incremental regeneration.
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
                {formatDate(event.date)} • {event.category} • {event.location}
              </p>
              <p className={styles.cardSummary}>{event.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<SSGPageProps> = async () => {
  let events: CommunityEvent[] = [];

  try {
    const rawData = await retrieveCollection("events");
    events = normalizeEvents(rawData as Record<string, unknown>[]);
  } catch (error) {
    console.error("Error in SSG events:", error);
  }

  return {
    props: {
      events,
      generatedAt: new Date().toISOString(),
    },
    revalidate: 120,
  };
};

export default SSGPage;
