import React from 'react';

import { List } from '@mui/material';
import { observer } from 'mobx-react-lite';

import ActionItem from '../ActionItem/ActionItem';
import { useRootStore } from '../../context/AppStateContext';
import { ITool } from '../../interfaces/tool.interfaces';
import { getToolIcon } from '../../utils/tools';

const AdditionToolList = (): JSX.Element => {
  const { addToolStore, uiStore } = useRootStore();

  return (
    <List>
      {addToolStore.tools.map((tool: ITool) => (
        <ActionItem
          key={tool.title}
          open={uiStore.isLeftNavOpen}
          iconElement={getToolIcon(tool.type)}
          handler={() => addToolStore.setSelectedTool(tool)}
          selected={addToolStore.selectedTool?.type === tool.type}
          {...tool}
        />
      ))}
    </List>
  );
};

export default observer(AdditionToolList);
