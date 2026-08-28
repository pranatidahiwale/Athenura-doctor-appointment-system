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
  
  // 1. Check Render's secret files path first (/etc/secrets/serviceAccountKey.json)
  const renderSecretPath = "/etc/secrets/serviceAccountKey.json";
  
  // 2. Check local path for development on your computer
  const localKeyPath = path.join(__dirname, "serviceAccountKey.json");

  if (existsSync(renderSecretPath)) {
    serviceAccount = JSON.parse(readFileSync(renderSecretPath, "utf-8"));
  } else if (existsSync(localKeyPath)) {
    serviceAccount = JSON.parse(readFileSync(localKeyPath, "utf-8"));
  } else {
    throw new Error("Service account key file not found in secrets or locally.");
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
