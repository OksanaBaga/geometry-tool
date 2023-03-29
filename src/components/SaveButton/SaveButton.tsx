import React from 'react';

import { observer } from 'mobx-react-lite';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import ActionItem from '../ActionItem/ActionItem';
import { useRootStore } from '../../context/AppStateContext';
import { EditToolTypes } from '../../types';

const SaveButton = (): JSX.Element => {
  const { sceneStore, uiStore } = useRootStore();

  return (
    <ActionItem
      open={uiStore.isLeftNavOpen}
      title={'Save'}
      iconElement={<CheckCircleRoundedIcon />}
      handler={() => sceneStore?.serialize()}
      type={EditToolTypes.SAVE}
    />
  );
};

export default observer(SaveButton);
