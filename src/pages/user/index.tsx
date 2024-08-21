"use client"; // This line ensures the code runs on the client side
import "../../styles/globals.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { mintNftByServerWallet, updateTokenUriByServer, getUserNftUriData } from "../../tools/contractFunctions"; // Adjust the path if necessary
import { useAccount } from "wagmi";

// Function to upload a file to S3
const uploadToS3 = async (fileContent: object) => {
  try {
    const response = await axios.post("/api/uploadToS3", {
      fileContent,
      fileName: `${Date.now()}.json`,
    });
    return response.data.url;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return null;
  }
};

// Main component
export default function User() {
  const { address } = useAccount();
  const [input, setInput] = useState(""); // State for input field
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  ); // State for chat messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [showChatWindow, setShowChatWindow] = useState(false); // State to control visibility of chat window
  const [isLoadingUri, setIsLoadingUri] = useState(false); // State for URI loading button
  const [isMintingNFT, setIsMintingNFT] = useState(false); // State for Mint NFT button
  const [isUpdatingNFT, setIsUpdatingNFT] = useState(false); // State for Update NFT button
  const [tokenId, setTokenId] = useState<bigint | null>(null); // State for the token ID to update
  const [nftData, setNftData] = useState<{ tokenId: bigint; tokenURI: string }[]>([]); // State for NFT data
  const [loadingNFTData, setLoadingNFTData] = useState(false); // State for loading NFT data
  const [showUriSelection, setShowUriSelection] = useState(false); // State to show/hide the NFT selection
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for messages end

  // Initial system message for the chat (will be set dynamically)
  const [initialSystemMessage, setInitialSystemMessage] = useState({
    role: "system",
    content: "",
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
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

  // Function to handle NFT selection from the list
  const handleNFTSelection = async (tokenId: bigint, tokenURI: string) => {
    setTokenId(tokenId); // Set the selected token ID
    setIsLoadingUri(true); // Set URI loading state to true

    const baseUrl = "https://ming-nft-text.s3.ap-northeast-1.amazonaws.com/chat_histories/";
    const fullTokenURI = `${baseUrl}${tokenURI}`; // Ensure the URI is correctly formatted

    try {
      const response = await axios.get(fullTokenURI);
      if (response.status === 200 && response.data) {
        const { initialSettings, chatHistory } = response.data;

        // Set the initial system message using initialSettings
        setInitialSystemMessage({
          role: "system",
          content: initialSettings,
        });

        setMessages(chatHistory); // Update the messages state with the fetched data
        setShowChatWindow(true); // Show chat window after selection
        setShowUriSelection(false); // Hide the NFT selection after loading
      } else {
        console.error("Failed to fetch data from URI:", response.status);
        alert("Failed to fetch data from URI");
      }
    } catch (error) {
      console.error("Error fetching data from URI:", error);
      alert("Failed to fetch data from URI");
    } finally {
      setIsLoadingUri(false); // Set URI loading state to false
    }
  };

  // Function to load NFT data
  const loadNFTData = async () => {
    setLoadingNFTData(true); // Set loading NFT data state to true
    if (address) {
      try {
        console.log(`Fetching NFT from: `,address)
        const nftData = await getUserNftUriData(address);
        setNftData(nftData);
        setShowUriSelection(true); // Show the NFT selection
        setLoadingNFTData(false);
      } catch (error) {
        console.error("Failed to load NFT data:", error);
        setLoadingNFTData(false); // Set loading NFT data state to false
      }
    } else {
      alert("Please connect to your wallet.");
      setLoadingNFTData(false); // Set loading NFT data state to false
    }
  };

  const handleUpdateNFT = async () => {
    setIsUpdatingNFT(true); // Set Update NFT loading state to true
  
    // Construct the JSON object to upload, including both initialSettings and chatHistory
    const fileContent = {
      initialSettings: initialSystemMessage.content, // Include initial settings
      chatHistory: messages, // Include chat history
    };
  
    const s3Url = await uploadToS3(fileContent);
    if (address && tokenId) {
      if (s3Url) {
        try {
          // Extract the numeric part from the S3 URL
          const regex = /chat_histories\/(\d+)\.json$/;
          const match = s3Url.match(regex);
          if (match && match[1]) {
            const s3Id = parseInt(match[1], 10); // Convert to a number
            const etherscanUrl = await updateTokenUriByServer(Number(tokenId), s3Id); // Pass the numeric part as s3Id
            alert(`NFT updated successfully! View transaction at: ${etherscanUrl}`);
            setTokenId(null); // Reset token ID after update
          } else {
            throw new Error("Invalid S3 URL format");
          }
        } catch (error) {
          console.error("Updating NFT failed:", error);
          alert("Updating NFT failed");
        }
      } else {
        alert("Failed to upload chat history to S3");
      }
    } else {
      alert("Please connect to your wallet and select an NFT.");
    }
  
    setIsUpdatingNFT(false); // Set Update NFT loading state to false
  };
  

  // HTML part
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-100">
        {!showChatWindow && (
          <div className="flex justify-center items-center">
            <button
              onClick={loadNFTData}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                loadingNFTData ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loadingNFTData}
            >
              {loadingNFTData ? "Loading..." : "Load NFT"}
            </button>
          </div>
        )}

        {showChatWindow && (
          <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white border border-gray-300 rounded shadow-lg">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
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

            <form
              onSubmit={handleSubmit}
              className="w-full border-t border-gray-300 p-4 bg-white"
            >
              <div className="flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Type your message..."
                  aria-label="Chat input"
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
            <div className="flex justify-end space-x-2 p-4">
              <button
                onClick={loadNFTData}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  loadingNFTData ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loadingNFTData}
              >
                {loadingNFTData ? "Loading..." : "Load NFT"}
              </button>
              <button
                onClick={async () => {
                  const confirmUpdate = window.confirm("Update confirm?");
                  if (confirmUpdate) await handleUpdateNFT();
                }}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                  isUpdatingNFT ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isUpdatingNFT}
              >
                {isUpdatingNFT ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        )}

        {showUriSelection && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-black">Select an NFT</h2>
              <div className="space-y-4">
                {nftData.map((data, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-2 border border-gray-300 rounded text-black hover:bg-gray-200"
                    onClick={() => handleNFTSelection(data.tokenId, data.tokenURI)}
                  >
                    <p>Token ID: {data.tokenId.toString()}</p>
                    <p>Token URI: {data.tokenURI}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowUriSelection(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
