import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { IAccount, AccountWithId } from "@/app/models/account";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const accounts = await db.collection<IAccount>("accounts").find().toArray();

    return NextResponse.json({ success: true, data: accounts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const account: IAccount = {
      name,
      createdAt: new Date(),
    };

    const result = await db.collection<IAccount>("accounts").insertOne(account);

    const newAccount = await db
      .collection<IAccount>("accounts")
      .findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, data: newAccount });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
