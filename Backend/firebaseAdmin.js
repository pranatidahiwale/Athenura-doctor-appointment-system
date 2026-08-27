 // Backend/firebaseAdmin.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let adminAuth;

try {
  const serviceAccount = JSON.parse(
    readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf-8")
  );

  initializeApp({
    credential: cert(serviceAccount),
  });

  adminAuth = getAuth();
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.warn("⚠️ Firebase Admin SDK not initialized: serviceAccountKey.json is missing or invalid.");
  // adminAuth will be undefined, which might cause errors on routes that rely on it, 
  // but at least the server will start up.
}

export default adminAuth;