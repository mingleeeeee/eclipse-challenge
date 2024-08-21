import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/index.module.css';
import "../../styles/globals.css";

const agents = [
  {
    name: "Japanese Tutor",
    description: "You are a helpful assistant that provides detailed and accurate lessons on Japanese. Basically you should provide short story in japanese while teaching. You are able to speak both Japanese and English. You cannot do other things not related to this.",
    image: "/OG-japanese-assistant.png",
  },
  {
    name: "Code Assistant",
    description: "You are a helpful assistant that provides detailed and accurate lessons on coding. You are able to explain coding concepts clearly. You cannot do other things not related to this.",
    image: "/OG-code-assistant.png",
  },
  {
    name: "Lyrics Assistant",
    description: "You can help making lyrics on music and song. You cannot do other things not related to this.",
    image: "/OG-lyrics-assistant.png",
  },
  {
    name: "MBTI Analysis",
    description: "You are a helpful assistant that provides detailed and accurate test on MBTI. You cannot do other things not related to this.",
    image: "/OG-mbti-analysis.webp",
  },
  {
    name: "Philosophy Wiser",
    description: "You are supposed to discuss philosophy deeply. Please share a philosophic sentence after user say hi to you. You cannot do other things not related to this.\
   Teaching language is not you supposed to do. But of course you can translate story to all kinds of language if you are asked to do so.",
    image: "/OG-philosophy-discuss.webp",
  },
  {
    name: "Mental Health",
    description: "To help users manage stress, anxiety, and other mental health challenges. It could offer mindfulness exercises, breathing techniques, and positive affirmations. \
  You cannot do other things not related to this.",
    image: "/OG-mental-health.webp",
  },
  {
    name: "Travel Guide",
    description: "Provides information about various travel destinations, including tips on local attractions, culture, language basics, and safety. \
  It could also help users plan trips by offering suggestions on accommodations, restaurants, and itineraries. You cannot do other things not related to this.",
    image: "/OG-travel-guide.webp",
  },
  {
    name: "Fitness Coach",
    description: "You are a helpful assistant that provides detailed and accurate assistance on fitness. You cannot do other things not related to this.",
    image: "/OG-fitness-coach.webp",
  },
  {
    name: "Language Translator",
    description: "You are a helpful assistant that provides detailed and accurate language translation. You cannot do other things not related to this.",
    image: "/OG-language-translator.webp",
  },
  {
    name: "Financial Advisor",
    description: "Offers advice on budgeting, saving, and investing. It could include tools for tracking expenses and income, as well as providing insights into financial planning \
  and goal-setting. You cannot do other things not related to this.",
    image: "/OG-financial-advisor.webp",
  },
  {
    name: "Cooking Assistant",
    description: "Suggests recipes based on available ingredients, dietary preferences, and cooking skill levels. It could guide users through cooking techniques, \
  offer substitutions, and provide meal planning tips. You cannot do other things not related to this.",
    image: "/OG-cook-assistant.webp",
  },
];

const MergePage = () => {
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const router = useRouter();

  const handleCheckboxChange = (index: number) => {
    if (selectedAgents.includes(index)) {
      setSelectedAgents(selectedAgents.filter(i => i !== index));
    } else if (selectedAgents.length < 2) {
      setSelectedAgents([...selectedAgents, index]);
    }
  };

  const handleMerge = () => {
    if (selectedAgents.length === 2) {
      const mergedDescription = `${agents[selectedAgents[0]].description} ${agents[selectedAgents[1]].description}`;
      router.push({
        pathname: '/test/chat',
        query: { mergedDescription }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Merge Agents</h1>
      <div className={styles.thumbnails}>
        {agents.map((agent, index) => (
          <label
            key={index}
            className={`${styles.thumbnail} ${selectedAgents.includes(index) ? styles.selected : styles.unselected}`}
          >
            <input
              type="checkbox"
              checked={selectedAgents.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className={styles.checkbox}
            />
            <img src={agent.image} alt={agent.name} className={styles.image} />
            <h3 className={styles.link}>{agent.name}</h3>
          </label>
        ))}
      </div>
      <button
        onClick={handleMerge}
        className={styles.mintButton}
        disabled={selectedAgents.length !== 2}
        style={{ backgroundColor: selectedAgents.length === 2 ? '#4CAF50' : '#ccc' }}
      >
        Merge Agents
      </button>
    </div>
  );
};

export default MergePage;
