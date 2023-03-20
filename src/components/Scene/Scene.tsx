import React from 'react';

import { useRootStore } from '../../context/AppStateContext';
import { SceneContainer } from './Scene.styles';

const Scene = (): JSX.Element => {
  const { sceneStore } = useRootStore();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      // Set canvas ref to initialize the Scene when it exists
      sceneStore.setCanvasRef(canvasRef.current);
    }
  }, []);

  return (
    <SceneContainer id={'canvas-renderer'}>
      <canvas ref={canvasRef} />
    </SceneContainer>
  );
};

export default Scene;
