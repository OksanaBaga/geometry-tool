import React from 'react';

import { useRootStore } from '../../context/AppStateContext';
import { SceneContainer } from './Scene.styles';

const Scene = (): JSX.Element => {
  const { setCanvasRef } = useRootStore();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useLayoutEffect(() => {
    if (canvasRef.current) {
      // Set canvas ref to initialize the Scene when it exists
      setCanvasRef(canvasRef.current);
    }
  }, []);

  return (
    <SceneContainer id={'canvas-renderer'}>
      <canvas ref={canvasRef} />
    </SceneContainer>
  );
};

export default Scene;
