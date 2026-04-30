const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const lines = envContent.split('\n');

for (const line of lines) {
  if (line.trim().startsWith('FIREBASE_PRIVATE_KEY=')) {
    const val = line.substring('FIREBASE_PRIVATE_KEY='.length).trim();
    // Remove quotes if they exist
    let cleanVal = val;
    if (cleanVal.startsWith('"') && cleanVal.endsWith('"')) {
      cleanVal = cleanVal.substring(1, cleanVal.length - 1);
    }
    process.env.FIREBASE_PRIVATE_KEY = cleanVal;
  }
  if (line.trim().startsWith('FIREBASE_PROJECT_ID=')) {
    process.env.FIREBASE_PROJECT_ID = line.substring('FIREBASE_PROJECT_ID='.length).trim();
  }
  if (line.trim().startsWith('FIREBASE_CLIENT_EMAIL=')) {
    process.env.FIREBASE_CLIENT_EMAIL = line.substring('FIREBASE_CLIENT_EMAIL='.length).trim();
  }
}

console.log("Raw Key:", process.env.FIREBASE_PRIVATE_KEY.substring(0, 40));
console.log("Replaced Key:", process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").substring(0, 40));

const admin = require('firebase-admin');
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
  console.log("Firebase Admin Initialized successfully");
} catch (e) {
  console.error("Firebase Admin Error:", e.message);
}
