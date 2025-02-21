"use client";

import { useState } from "react";
import { AccountWithId } from "@/app/models/account"; // Import the correct type

interface AccountFormProps {
  onAccountCreated: (account: AccountWithId) => void;
}

export default function AccountForm({ onAccountCreated }: AccountFormProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data.success) {
        onAccountCreated(data.data);
        setName("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full p-2 border rounded !text-black"
          disabled={isLoading}
          required
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-2 text-white rounded ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}