"use client";
import "../../styles/globals.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

// Initial system message for the coding tutor bot
const initialSystemMessage = {
  role: "system",
  content: "To help users manage stress, anxiety, and other mental health challenges. It could offer mindfulness exercises, breathing techniques, and positive affirmations. \
  You cannot do other things not related to this.",
};

const initialAssistantMessage = {
  role: "assistant",
  content: "",
};

// Main component for the coding tutor bot
export default function CodingTutor() {
  const [input, setInput] = useState(""); // State for input field
  //const [messages, setMessages] = useState<{ role: string; content: string }[]>([initialAssistantMessage]); // State for chat messages, starts with the assistant's initial message
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for messages end

  // Clear messages every time the component mounts
  useEffect(() => {
    console.log("Initial System Message:", initialSystemMessage);
    //setMessages([initialAssistantMessage]);
  }, []);

  // Scroll to the end of messages when messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Save chat history to localStorage whenever messages state changes
  useEffect(() => {
    localStorage.setItem("chatHistoryCodingTutor", JSON.stringify(messages));
  }, [messages]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput(""); // Clear the input immediately
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post("/api/chat", {
        messages: [initialSystemMessage, ...updatedMessages],
      });

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching the OpenAI response:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // HTML part
  return (
    <main className="flex min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="flex items-start">
                    <Image
                      src="/OG-mental-health.webp"
                      alt="Assistant Thumbnail"
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div className="max-w-xs p-2 rounded-lg bg-gray-200 text-black">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="max-w-xs p-2 rounded-lg bg-blue-200 text-black">
                    <p>{msg.content}</p>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-xs p-2 rounded-lg bg-gray-200 text-black ellipsis">
                  {/* Loading indicator can be added here */}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="w-full border-t border-gray-300 p-4 bg-white">
            <div className="flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Type your message..."
                aria-label="Chat input"
              />
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
