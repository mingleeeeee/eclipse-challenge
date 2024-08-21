import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../styles/globals.css";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className={styles.container}>
          <h1 className={styles.title}>Monad AI POC</h1>

          {/* <div className={animationStyles.container}>
        <div className={animationStyles.circle}></div>
      </div> */}
          <div className={styles.imageContainer}>
            <Image
              src="/ai-agent.webp" // Path to the image in the public folder
              alt="Thumbnail Image"
              width={300} // Adjust the width as needed
              height={300} // Adjust the height as needed
            />
          </div>
          <div className={styles.content}>
            <p>Chat with AI agents</p>
            <p>And create your own NFT</p>
          </div>
          <div className={styles.buttonContainer}>
            <Link href="/test" passHref>
              <button className={styles.button}>
                Chat with OG agent first
              </button>
            </Link>
            <Link href="/user" passHref>
              <button className={styles.button}>
                Create your own NFT based on your chat with agents
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
