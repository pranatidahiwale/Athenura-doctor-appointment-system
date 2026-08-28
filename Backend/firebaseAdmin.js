 // Backend/firebaseAdmin.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminAuth;

try {
  // Fixes potential newline escaping issues from Render environment variables
  const rawKey = process.env.FIREBASE_SERVICE_KEY;
  const fixedKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;
  const serviceAccount = JSON.parse(fixedKey);

  initializeApp({
    credential: cert(serviceAccount),
  });

  adminAuth = getAuth();
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("⚠️ Firebase Admin SDK initialization failed:", error.message);
}

export default adminAuth;
