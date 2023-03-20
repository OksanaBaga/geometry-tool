import React from 'react';

import { List } from '@mui/material';
import { observer } from 'mobx-react-lite';

import ActionItem from '../ActionItem/ActionItem';
import { useRootStore } from '../../context/AppStateContext';
import { ITool } from '../../interfaces/tool.interfaces';
import { getToolIcon } from '../../utils/tools';
import { TShape } from '../../types';

const AdditionToolList = (): JSX.Element => {
  const { addToolStore, uiStore, sceneStore } = useRootStore();

  return (
    <List>
      {addToolStore.tools.map((tool: ITool) => (
        <ActionItem
          key={tool.title}
          open={uiStore.isLeftNavOpen}
          iconElement={getToolIcon(tool.type)}
          handler={() => sceneStore.addShape(tool.type as TShape)}
          {...tool}
        />
      ))}
    </List>
  );
};

export default observer(AdditionToolList);
