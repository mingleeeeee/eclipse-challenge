// pages/test/index.tsx
import Link from 'next/link';
import styles from '../../styles/index.module.css'; // You can create a CSS module for styling
import "../../styles/globals.css";

const IndexPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>OG Agents (Beta)</h1>
      <div className={styles.thumbnails}>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-japanese-tutor" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-japanese-assistant.png" alt="Japanese Tutor" className={styles.image} />
              <p>Japanese Tutor</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-code-assistant" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-code-assistant.png" alt="Code Assistant" className={styles.image} />
              <p>Code Assistant</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-lyrics-assistant" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-lyrics-assistant.png" alt="Lyrics Assistant" className={styles.image} />
              <p>Lyrics Assistant</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-joke-maker" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-joke-maker.jpg" alt="Joke Maker" className={styles.image} />
              <p>Joke Maker</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-mbti-analysis" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-mbti-analysis.webp" alt="MBTI Analysis" className={styles.image} />
              <p>MBTI Analysis</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-philosophy-discuss" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-philosophy-discuss.webp" alt="Philosophy Discuss" className={styles.image} />
              <p>Philosophy Wiser</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-mental-health" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-mental-health.webp" alt="Mental Health" className={styles.image} />
              <p>Mental Health</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-travel-guide" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-travel-guide.webp" alt="Travel Guide" className={styles.image} />
              <p>Travel Guide</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-fitness-coach" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-fitness-coach.webp" alt="Fitness Coach" className={styles.image} />
              <p>Fitness Coach</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-language-translator" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-language-translator.webp" alt="Language Translator" className={styles.image} />
              <p>Language Translator</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-financial-advisor" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-financial-advisor.webp" alt="Financial Advisor" className={styles.image} />
              <p>Financial Advisor</p>
            </a>
          </Link>
        </div>
        <div className={styles.thumbnail}>
          <Link href="/test/agent-cooking-assistant" legacyBehavior>
            <a className={styles.link}>
              <img src="/OG-cook-assistant.webp" alt="Cooking Assistant" className={styles.image} />
              <p>Cooking Assistant</p>
            </a>
          </Link>
        </div>
      </div>
      
      <div className={styles.footer}>
        <Link href="/test/merge" legacyBehavior>
          <a className={styles.mintButton}>
            Make and mint your own agent
          </a>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
