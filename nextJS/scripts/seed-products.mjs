import nextEnv from "@next/env";
import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, writeBatch } from "firebase/firestore";

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

const defaultProducts = [
  { name: "Kemeja Formal", price: 150000, size: "M", category: "Pakaian Pria" },
  { name: "Baju Berlengan Panjang", price: 120000, size: "L", category: "Pakaian Kasual" },
  { name: "Kaos Polos", price: 75000, size: "S", category: "Basic Wear" },
  { name: "Baju Polo", price: 100000, size: "XL", category: "Smart Casual" },
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const cleanupSeedDocs = process.argv.includes("--cleanup-seed");
const collectionName = "products";

const normalizeName = (value) => value.trim().toLowerCase();

async function seedProducts() {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  const batch = writeBatch(db);

  const docsByName = new Map();
  snapshot.docs.forEach((item) => {
    const data = item.data();
    if (!data?.name || typeof data.name !== "string") {
      return;
    }

    const key = normalizeName(data.name);
    const current = docsByName.get(key) ?? [];
    current.push({ id: item.id, ref: item.ref });
    docsByName.set(key, current);
  });

  let updatedCount = 0;
  let insertedCount = 0;

  defaultProducts.forEach((product) => {
    const key = normalizeName(product.name);
    const existingDocs = docsByName.get(key) ?? [];
    const preferredExisting = existingDocs.find((entry) => !entry.id.startsWith("seed-")) ?? existingDocs[0];

    if (preferredExisting) {
      batch.set(preferredExisting.ref, product, { merge: true });
      updatedCount += 1;
      return;
    }

    const autoIdRef = doc(collectionRef);
    batch.set(autoIdRef, product);
    insertedCount += 1;
  });

  let deletedSeedCount = 0;
  if (cleanupSeedDocs) {
    snapshot.docs
      .filter((item) => item.id.startsWith("seed-"))
      .forEach((item) => {
        batch.delete(item.ref);
        deletedSeedCount += 1;
      });
  }

  await batch.commit();
  console.log(`Sinkronisasi selesai untuk \"${collectionName}\".`);
  console.log(`- Updated: ${updatedCount}`);
  console.log(`- Inserted (auto ID): ${insertedCount}`);
  if (cleanupSeedDocs) {
    console.log(`- Deleted seed-* docs: ${deletedSeedCount}`);
  }
}

seedProducts().catch((error) => {
  console.error("Gagal seed products:", error);
  process.exit(1);
});
