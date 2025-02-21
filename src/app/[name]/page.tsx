import { Metadata } from "next";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import AccountActions from "@/components/AccountActions";

interface Props {
  params: { name?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = params || {}; // Ensure params exist before accessing properties

  if (!name) {
    return { title: "Page Not Found" };
  }

  return {
    title: `Page for ${name}`,
  };
}

async function getAccount(name: string) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return db.collection("accounts").findOne({ name });
}

export default async function AccountPage({ params }: Props) {
  if (!params || !params.name) {
    notFound();
  }

  const { name } = params; // Extract name safely
  const account = await getAccount(name);

  if (!account) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        This page is for {account.name}
      </h1>
      <AccountActions name={account.name} accountId={account._id.toString()} />
    </div>
  );
}
