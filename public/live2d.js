// public/live2d.js

async function loadLive2DModel(canvasId, modelPath) {
    console.log('Loading PIXI and Live2DModel...');
  
    if (!window.PIXI) {
      console.error('PIXI is not loaded');
      return;
    }
  
    const app = new window.PIXI.Application({
      view: document.getElementById(canvasId),
      autoStart: true,
      backgroundAlpha: 0,
      resizeTo: window,
    });
  
    const Live2DModel = window.PIXI.live2d.Live2DModel;
  
    if (!Live2DModel) {
      console.error('Live2DModel is not available on PIXI');
      return;
    }
  
    try {
      console.log('Loading Live2D model from:', modelPath);
      const currentModel = await Live2DModel.from(modelPath);
  
      if (!currentModel) {
        console.error('Failed to load the Live2D model');
        return;
      }
  
      console.log('Live2D model loaded:', currentModel);
  
      const desiredHeight = 650; // Desired height in pixels
      const scale = desiredHeight / currentModel.internalModel.height;
  
      currentModel.scale.set(scale);
      currentModel.anchor.set(0.5, 0.5);
      currentModel.position.set(app.view.width / 2, desiredHeight / 2);
  
      app.stage.addChild(currentModel);
      console.log('Live2D model added to the stage');
  
      app.ticker.add((delta) => {
        currentModel.update(delta);
      });
  
      window.addEventListener('resize', () => {
        currentModel.position.set(window.innerWidth / 2, desiredHeight / 2);
      });
  
      console.log('Live2D model loaded successfully');
    } catch (error) {
      console.error('Error loading Live2D model:', error);
    }
  }
  
  // Add the function to the window object
  window.loadLive2DModel = loadLive2DModel;
  