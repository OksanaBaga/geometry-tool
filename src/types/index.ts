export enum EditToolTypes {
  SELECT = 'SELECT',
  MOVE = 'MOVE',
  CLOSEST_POINT = 'CLOSEST_POINT',
  TRIANGLE = 'TRIANGLE',
  SQUARE = 'SQUARE',
  HEXAGON = 'HEXAGON',
}

export type TShape =
  | EditToolTypes.SQUARE
  | EditToolTypes.HEXAGON
  | EditToolTypes.TRIANGLE;
