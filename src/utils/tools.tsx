import NavigationIcon from '@mui/icons-material/Navigation';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import CodeIcon from '@mui/icons-material/Code';
import ChangeHistoryTwoToneIcon from '@mui/icons-material/ChangeHistoryTwoTone';
import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
import HexagonTwoToneIcon from '@mui/icons-material/HexagonTwoTone';

import { EditToolTypes } from '../types';
import { ITool } from '../interfaces/tool.interfaces';

const getEditToolList = (): ITool[] => {
  return [
    {
      title: 'Select',
      type: EditToolTypes.SELECT,
    },
    {
      title: 'Move',
      type: EditToolTypes.MOVE,
    },
    {
      title: 'Closest points',
      type: EditToolTypes.CLOSEST_POINT,
    },
  ];
};

const getAddToolList = (): ITool[] => {
  return [
    {
      title: 'Triangle',
      type: EditToolTypes.TRIANGLE,
    },
    {
      title: 'Square',
      type: EditToolTypes.SQUARE,
    },
    {
      title: 'Hexagon',
      type: EditToolTypes.HEXAGON,
    },
  ];
};

const getToolIcon = (type: EditToolTypes) => {
  switch (type) {
    case EditToolTypes.CLOSEST_POINT:
      return <CodeIcon />;
    case EditToolTypes.MOVE:
      return <ControlCameraIcon />;
    case EditToolTypes.SELECT:
      return <NavigationIcon />;
    case EditToolTypes.TRIANGLE:
      return <ChangeHistoryTwoToneIcon />;
    case EditToolTypes.HEXAGON:
      return <HexagonTwoToneIcon />;
    case EditToolTypes.SQUARE:
      return <SquareTwoToneIcon />;
    default:
      return null;
  }
};

export { getAddToolList, getEditToolList, getToolIcon };
