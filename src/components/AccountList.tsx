'use client';

import { AccountWithId } from '@/app/models/account';
// import { AccountWithId } from '@/models/account';
import { generateDeepLink } from '@/lib/utils';

interface AccountListProps {
  accounts: AccountWithId[];
}

export default function AccountList({ accounts }: AccountListProps) {
  const copyDeepLink = (name: string) => {
const { deepLink, webLink } = generateDeepLink(name);

    window.location.href = deepLink;

    setTimeout(() => {
      window.location.href = webLink;
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      {accounts && accounts.map((account) => (
        <div key={account._id.toString()} className="border p-4 rounded shadow-sm">
          <h2 className="text-xl mb-2">{account.name}</h2>
          <div className="flex gap-4">
            <a
              href={`/${account.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Page
            </a>
            <button
              onClick={() => copyDeepLink(account.name)}
              className="text-green-500 hover:underline"
            >
              Copy Share Link
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}