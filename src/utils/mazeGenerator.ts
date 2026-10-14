import { CellType, MazeMap, ObstacleInstance } from '../types/game';

// Randomized Prim's or Recursive Backtracker Maze Generator
export function generateMaze(
  width: number,
  height: number,
  questionIds: number[]
): MazeMap {
  // Ensure odd dimensions
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;

  // Initialize all as walls
  const grid: CellType[][] = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => 'wall' as CellType)
  );

  // Carve passages using recursive backtracking with stack
  const stack: [number, number][] = [];
  const startX = 1;
  const startY = 1;

  grid[startY][startX] = 'path';
  stack.push([startX, startY]);

  const directions = [
    [0, -2], // Up
    [0, 2],  // Down
    [-2, 0], // Left
    [2, 0]   // Right
  ];

  while (stack.length > 0) {
    const [cx, cy] = stack[stack.length - 1];

    // Shuffle directions
    const shuffledDirs = [...directions].sort(() => Math.random() - 0.5);
    let carved = false;

    for (const [dx, dy] of shuffledDirs) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1 && grid[ny][nx] === 'wall') {
        // Carve between
        grid[cy + dy / 2][cx + dx / 2] = 'path';
        grid[ny][nx] = 'path';
        stack.push([nx, ny]);
        carved = true;
        break;
      }
    }

    if (!carved) {
      stack.pop();
    }
  }

  // Set start
  grid[startY][startX] = 'start';

  // Set exit at far reachable corner
  let exitX = w - 2;
  let exitY = h - 2;
  // If exit is wall (rare), find nearest path
  if (grid[exitY][exitX] === 'wall') {
    let found = false;
    for (let r = h - 2; r >= 1 && !found; r--) {
      for (let c = w - 2; c >= 1 && !found; c--) {
        if (grid[r][c] === 'path') {
          exitX = c;
          exitY = r;
          found = true;
        }
      }
    }
  }
  grid[exitY][exitX] = 'exit';

  // Find all path cells
  const pathCells: { x: number; y: number; dist: number }[] = [];

  // Calculate distances from start using BFS
  const dist: number[][] = Array.from({ length: h }, () => Array(w).fill(-1));
  const queue: [number, number, number][] = [[startX, startY, 0]];
  dist[startY][startX] = 0;

  while (queue.length > 0) {
    const [x, y, d] = queue.shift()!;
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (
        nx > 0 &&
        nx < w - 1 &&
        ny > 0 &&
        ny < h - 1 &&
        grid[ny][nx] !== 'wall' &&
        dist[ny][nx] === -1
      ) {
        dist[ny][nx] = d + 1;
        queue.push([nx, ny, d + 1]);
        if (!(nx === startX && ny === startY) && !(nx === exitX && ny === exitY)) {
          pathCells.push({ x: nx, y: ny, dist: d + 1 });
        }
      }
    }
  }

  // Filter path cells so obstacles are not immediately adjacent to start
  const validObstacleCells = pathCells.filter(cell => cell.dist >= 2 && !(cell.x === exitX && cell.y === exitY));
  validObstacleCells.sort((a, b) => a.dist - b.dist);

  const numQuestions = questionIds.length;
  const obstacles: ObstacleInstance[] = [];

  // We want to distribute obstacles evenly along progression
  if (validObstacleCells.length >= numQuestions) {
    const segmentSize = Math.floor(validObstacleCells.length / numQuestions);
    const chosenPositions = new Set<string>();

    for (let i = 0; i < numQuestions; i++) {
      const qId = questionIds[i];
      const startIdx = i * segmentSize;
      const endIdx = Math.min((i + 1) * segmentSize, validObstacleCells.length);
      const candidates = validObstacleCells.slice(startIdx, endIdx);

      // Prefer cells with 2 walls opposite (tight corridor) or best candidate
      let bestCell = candidates[Math.floor(candidates.length / 2)] || candidates[0];

      for (const cell of candidates) {
        const key = `${cell.x},${cell.y}`;
        if (chosenPositions.has(key)) continue;

        // Check if corridor
        const hasHorizontalWalls = grid[cell.y][cell.x - 1] === 'wall' && grid[cell.y][cell.x + 1] === 'wall';
        const hasVerticalWalls = grid[cell.y - 1][cell.x] === 'wall' && grid[cell.y + 1][cell.x] === 'wall';

        if (hasHorizontalWalls || hasVerticalWalls) {
          bestCell = cell;
          break;
        }
      }

      if (bestCell) {
        chosenPositions.add(`${bestCell.x},${bestCell.y}`);
        grid[bestCell.y][bestCell.x] = 'obstacle';
        obstacles.push({
          id: i + 1,
          questionId: qId,
          x: bestCell.x,
          y: bestCell.y,
          isCleared: false
        });
      }
    }
  }

  // Add a few sparkling gems in dead ends for extra bonus points
  for (const cell of pathCells) {
    if (grid[cell.y][cell.x] === 'path') {
      let wallCount = 0;
      if (grid[cell.y - 1][cell.x] === 'wall') wallCount++;
      if (grid[cell.y + 1][cell.x] === 'wall') wallCount++;
      if (grid[cell.y][cell.x - 1] === 'wall') wallCount++;
      if (grid[cell.y][cell.x + 1] === 'wall') wallCount++;

      // Dead end has 3 walls around it
      if (wallCount === 3 && Math.random() < 0.6) {
        grid[cell.y][cell.x] = 'gem';
      }
    }
  }

  return {
    width: w,
    height: h,
    grid,
    startX,
    startY,
    exitX,
    exitY,
    obstacles
  };
}
