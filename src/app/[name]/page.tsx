import { Metadata } from "next";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import AccountActions from "@/components/AccountActions";

interface PageParams {
  name: string;
}

async function getAccount(name: string) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return db.collection("accounts").findOne({ name });
}

export async function generateMetadata(
  { params }: { params: Promise<PageParams> }
): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams?.name) {
    return { title: "Page Not Found" };
  }
  return {
    title: `Page for ${resolvedParams.name}`,
  };
}

export default async function AccountPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const name = resolvedParams.name;

  if (!name) {
    notFound();
  }

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