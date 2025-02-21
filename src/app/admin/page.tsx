"use client";

import { useState, useEffect } from 'react';
import AccountForm from '@/components/AccountForm';
import AccountList from '@/components/AccountList';
import { AccountWithId } from '../models/account';

export default function AdminDashboardClient() {
  const [accounts, setAccounts] = useState<AccountWithId[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      setAccounts(data.data || []); 
      console.log('accounts',data.data)
    };
    fetchAccounts();
  }, []);

  const handleAccountCreated = (account: AccountWithId) => {
    setAccounts((prev) => [...prev, account]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-8">
        <AccountForm onAccountCreated={handleAccountCreated} />
      </div>
      <AccountList accounts={accounts} />
    </div>
  );
}