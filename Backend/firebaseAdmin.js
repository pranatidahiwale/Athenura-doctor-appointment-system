 // Backend/firebaseAdmin.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let adminAuth;

try {
  let serviceAccount;
  const localKeyPath = path.join(__dirname, "serviceAccountKey.json");

  // Check if the local serviceAccountKey.json file exists (works great locally and if pushed)
  if (existsSync(localKeyPath)) {
    serviceAccount = JSON.parse(readFileSync(localKeyPath, "utf-8"));
  } else if (process.env.FIREBASE_SERVICE_KEY) {
    // Fallback to environment variable if file isn't found
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
  } else {
    throw new Error("Service account key file or environment variable not found.");
  }

  initializeApp({
    credential: cert(serviceAccount),
  });

  adminAuth = getAuth();
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("⚠️ Firebase Admin SDK initialization failed:", error.message);
}

export default adminAuth;
