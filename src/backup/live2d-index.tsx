import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

declare global {
  interface Window {
    loadLive2DModel?: (canvasId: string, modelPath: string) => void;
    PIXI?: any;
  }
}

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadScripts = async () => {
      console.log('Loading scripts...');

      const cubismCoreScript = document.createElement('script');
      cubismCoreScript.src = 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js';
      cubismCoreScript.async = true;

      const live2dScript = document.createElement('script');
      live2dScript.src = 'https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js';
      live2dScript.async = true;

      const pixiScript = document.createElement('script');
      pixiScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js';
      pixiScript.async = true;

      const pixiLive2DScript = document.createElement('script');
      pixiLive2DScript.src = 'https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js';
      pixiLive2DScript.async = true;

      cubismCoreScript.onload = () => {
        console.log('Live2D core loaded');
        live2dScript.onload = () => {
          console.log('Live2D script loaded');
          pixiScript.onload = () => {
            console.log('PIXI.js loaded');
            pixiLive2DScript.onload = () => {
              console.log('pixi-live2d-display loaded');
              if (canvasRef.current && window.loadLive2DModel) {
                console.log('Initializing Live2D model...');
                window.loadLive2DModel('live2dCanvas', '/live2d/chiikawa.model3.json');
              }
            };
            pixiLive2DScript.onerror = (error) => {
              console.error('Failed to load pixi-live2d-display:', error);
            };
            document.body.appendChild(pixiLive2DScript);
          };
          pixiScript.onerror = (error) => {
            console.error('Failed to load PIXI.js:', error);
          };
          document.body.appendChild(pixiScript);
        };
        live2dScript.onerror = (error) => {
          console.error('Failed to load Live2D script:', error);
        };
        document.body.appendChild(live2dScript);
      };
      cubismCoreScript.onerror = (error) => {
        console.error('Failed to load Live2D core:', error);
      };

      document.body.appendChild(cubismCoreScript);
    };

    loadScripts();

    return () => {
      const cubismCoreScript = document.querySelector('script[src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"]');
      if (cubismCoreScript) {
        cubismCoreScript.remove();
      }
      const live2dScript = document.querySelector('script[src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js"]');
      if (live2dScript) {
        live2dScript.remove();
      }
      const pixiScript = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"]');
      if (pixiScript) {
        pixiScript.remove();
      }
      const pixiLive2DScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js"]');
      if (pixiLive2DScript) {
        pixiLive2DScript.remove();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monad AI POC</h1>
      <div className={styles.imageContainer}>
        <canvas id="live2dCanvas" ref={canvasRef} width="800" height="600" />
      </div>
      <div className={styles.content}>
        <p>Chat with AI agents</p>
        <p>And create your own NFT</p>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/test" passHref>
          <button className={styles.button}>Chat with OG agent first</button>
        </Link>
        <Link href="/user" passHref>
          <button className={styles.button}>Create your own NFT based on your chat with agents</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
