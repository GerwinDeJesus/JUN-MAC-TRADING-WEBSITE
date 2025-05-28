"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">
      {/* Back to Home button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back to Home
      </button>

      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-3xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-6 py-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-6 py-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-gray-300 px-6 py-4 text-lg rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg px-8 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
