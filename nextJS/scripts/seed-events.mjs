import nextEnv from "@next/env";
import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, doc, getFirestore, writeBatch } from "firebase/firestore";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const requiredEnvKeys = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
];

const missingEnvKeys = requiredEnvKeys.filter((key) => !process.env[key]);
if (missingEnvKeys.length > 0) {
  console.error("Missing Firebase env:", missingEnvKeys.join(", "));
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const eventSeeds = [
  {
    id: "event-seed-1",
    title: "Workshop UI Writing",
    date: "2026-03-18",
    location: "Malang Creative Hub",
    category: "Workshop",
  },
  {
    id: "event-seed-2",
    title: "Frontend Meetup #12",
    date: "2026-03-22",
    location: "Online",
    category: "Meetup",
  },
  {
    id: "event-seed-3",
    title: "Tech Talk: Aksesibilitas Web",
    date: "2026-03-26",
    location: "Soekarno Hatta, Malang",
    category: "Talk",
  },
  {
    id: "event-seed-4",
    title: "Hackathon Malang 2026",
    date: "2026-04-05",
    location: "Malang Tech Park",
    category: "Hackathon",
  }
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = "events";

async function seedEvents() {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);

  eventSeeds.forEach((event) => {
    const ref = doc(collectionRef, event.id);
    batch.set(ref, event, { merge: true });
  });

  await batch.commit();
  console.log(`Seed ${eventSeeds.length} data ke koleksi "${collectionName}" selesai.`);
}

seedEvents().catch((error) => {
  console.error("Gagal seed events:", error);
  process.exit(1);
});
