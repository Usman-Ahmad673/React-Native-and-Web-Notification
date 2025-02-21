import { NextResponse } from "next/server";
import { sendPushNotification } from "@/lib/firebase";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { accountId, message } = await req.json();

    if (!accountId || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Find account and get Firebase tokens
    const account = await db.collection("accounts").findOne({ _id: new ObjectId(accountId) });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Get Firebase tokens stored in MongoDB (Assume "tokens" field contains FCM tokens)
    const tokens = account.tokens || [];

    // Send push notifications
    for (const token of tokens) {
      await sendPushNotification(token, `Notification from ${account.name}`, message);
    }

    // Log notification in MongoDB
    await db.collection("notifications").insertOne({
      accountId: new ObjectId(accountId),
      title: `Notification from ${account.name}`,
      message,
      createdAt: new Date(),
      status: "sent",
    });

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
