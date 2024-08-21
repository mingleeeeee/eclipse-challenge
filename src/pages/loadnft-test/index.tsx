"use client";
import { useAccount } from "wagmi";
import "../../styles/globals.css";
import React, { useEffect, useState } from "react";
import { getUserNftUriData } from "@/tools/contractFunctions";

export default function Loadnft() {
  const { address } = useAccount(); // Get the user's address
  // const [nftId, setNftId] = useState<string | null>(null);
  const [nftData, setNftData] = useState<
    { tokenId: bigint; tokenURI: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      getUserNftUriData(address).then((res) => {
        setNftData(res);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [address]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-100">
        {address ? (
           nftData.length > 0 ? (
            nftData.map((data, index) => (
              <div key={index} className="text-black">
                <p>Token ID: {data.tokenId.toString()}</p>
                <p>
                  Token URI:{" "}
                  <a
                    href={data.tokenURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    {data.tokenURI}
                  </a>
                </p>
              </div>
            ))
          ) : (
            <div className="text-black">No NFT found for this address.</div>
          )
        ) : (
          <div className="text-black">Please connect first</div>
        )}
      </div>
    </div>
  );
}
