"use client";
import "../../styles/globals.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { mintNftByServerWallet } from "../../tools/contractFunctions";
import { useAccount } from "wagmi";

export default function ChatPage() {
  const router = useRouter();
  const { mergedDescription } = router.query;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem("chatHistoryMergedAgent", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: mergedDescription }, ...updatedMessages],
        }),
      });

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.choices[0].message.content };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    setMinting(true);

    const fileContent = {
      initialSettings: mergedDescription,
      chatHistory: messages,
    };

    try {
      const uploadResponse = await axios.post("/api/uploadToS3", {
        fileContent,
        fileName: `${Date.now()}.json`,
      });

      const s3Url = uploadResponse.data.url;
      const regex = /chat_histories\/(\d+)\.json$/;
      const match = s3Url.match(regex);
      if (match && match[1]) {
        const s3Id = parseInt(match[1], 10); // Convert to a number
        const etherscanUrl = await mintNftByServerWallet(s3Id, address);
        alert(`NFT minted successfully! View transaction at: ${etherscanUrl}`);
      } else {
        throw new Error("Invalid S3 URL format");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Minting NFT failed");
    } finally {
      setMinting(false);
    }
  };

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
                      src="/chatbot.png"
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
          <div className="flex justify-end p-4">
            <button
              onClick={handleMint}
              className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ${
                minting ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={minting}
            >
              {minting ? "Minting..." : "Mint NFT"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
