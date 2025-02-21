"use client"; // This is required for client components in Next.js

import React from "react";
import axios from "axios";
import { generateDeepLink } from "@/lib/utils";

interface AccountActionsProps {
  name: string;
  accountId: string;
}
const domain = process.env.NEXT_PUBLIC_APP_DOMAIN || "https://brokage.vercel.app";

const AccountActions: React.FC<AccountActionsProps> = ({ name, accountId }) => {
  const { deepLink, webLink } = generateDeepLink(name);

  const handleShareLink = () => {
    window.location.href = deepLink;

    setTimeout(() => {
      window.location.href = webLink;
    }, 2000);
  };

  const handleSendNotification = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
        accountId,
        message: `Notification from ${name}`,
      });
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        onClick={handleShareLink}
      >
        Share Link
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSendNotification}
      >
        Send Notification
      </button>
    </div>
  );
};

export default AccountActions;
