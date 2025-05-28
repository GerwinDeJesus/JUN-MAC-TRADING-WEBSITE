"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface IMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const MAX_LENGTH = 100; // max characters before truncation

const Transactions = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/message/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
      <h2 className="text-3xl mb-4">Customer Inquiries</h2>

      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 border-b border-[#ececec]">
              <th className="p-2">SR No.</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Message</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => {
              const isExpanded = expandedIds.includes(msg._id);
              const shouldTruncate = msg.message.length > MAX_LENGTH;

              return (
                <tr key={msg._id} className="border-b border-[#ececec] align-top">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{msg.name}</td>
                  <td className="p-2">{msg.email}</td>
                  <td className="p-2 max-w-xs">
                    <div
                      className={`border rounded p-2 bg-gray-50 text-sm whitespace-pre-wrap ${
                        isExpanded ? "max-h-24 overflow-y-auto" : "max-h-16 overflow-hidden"
                      }`}
                    >
                      {shouldTruncate && !isExpanded
                        ? msg.message.slice(0, MAX_LENGTH) + "..."
                        : msg.message}
                    </div>
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(msg._id)}
                        className="ml-2 text-blue-600 hover:underline"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </td>
                  <td className="p-2">{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {messages.length === 0 && (
              <tr>
                <td className="p-2 text-center" colSpan={6}>
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
