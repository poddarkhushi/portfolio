import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // FIXED TYPO
    setStatus("Sending...");

    try {
      const res = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message saved!");
        setForm({ name: "", message: "" });
      } else {
        setStatus("Error saving message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to connect to server.");
    }
  };

  return (
    <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Contact Me</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          value={form.name}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          onChange={handleChange}
          value={form.message}
          className="w-full p-2 bg-gray-700 text-white rounded h-32"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </form>

      {status && <p className="text-gray-300 mt-4">{status}</p>}
    </section>
  );
}
