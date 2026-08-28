 // Backend/firebaseAdmin.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminAuth;

try {
  // Cleans up any weird control characters or broken formatting from the environment variable paste
  let rawKey = process.env.FIREBASE_SERVICE_KEY.trim();
  
  // If it accidentally got wrapped in extra quotes, remove them
  if (rawKey.startsWith('"') && rawKey.endsWith('"')) {
    rawKey = rawKey.slice(1, -1);
  }

  const serviceAccount = JSON.parse(rawKey);

  initializeApp({
    credential: cert(serviceAccount),
  });

  adminAuth = getAuth();
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("⚠️ Firebase Admin SDK initialization failed:", error.message);
}

export default adminAuth;
