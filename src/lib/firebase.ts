import admin from "firebase-admin";

// Validate environment variables
if (!process.env.FIREBASE_PROJECT_ID) {
  console.error("❌ Missing FIREBASE_PROJECT_ID");
}
if (!process.env.FIREBASE_CLIENT_EMAIL) {
  console.error("❌ Missing FIREBASE_CLIENT_EMAIL");
}
if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.error("❌ Missing FIREBASE_PRIVATE_KEY");
}

// Properly format the private key
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
    console.log("✅ Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing Firebase Admin:", error);
  }
}

export const firebaseAdmin = admin;

// Function to send push notifications
export const sendPushNotification = async (token: string, title: string, message: string) => {
  try {
    const payload = {
      notification: {
        title,
        body: message,
      },
      token,
    };

    const response = await admin.messaging().send(payload);
    console.log("✅ Notification sent:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};
