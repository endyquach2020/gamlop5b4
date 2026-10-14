export type CellType = 'wall' | 'path' | 'start' | 'exit' | 'obstacle' | 'gem';

export interface Cell {
  x: number;
  y: number;
  type: CellType;
  obstacleId?: number; // matches obstacle id
}

export interface ObstacleInstance {
  id: number;
  questionId: number;
  x: number;
  y: number;
  isCleared: boolean;
  clearTime?: number;
}

export interface MazeMap {
  width: number;
  height: number;
  grid: CellType[][];
  startX: number;
  startY: number;
  exitX: number;
  exitY: number;
  obstacles: ObstacleInstance[];
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface PlayerState {
  x: number;
  y: number;
  direction: Direction;
  walkFrame: number;
  steps: number;
  score: number;
  lives: number;
  streak: number;
}

export interface GameStats {
  totalQuestions: number;
  answeredCorrectly: number;
  answeredWrong: number;
  elapsedSeconds: number;
  stars: number;
}
