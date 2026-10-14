import React, { useRef, useEffect } from 'react';
import { MazeMap } from '../types/game';

interface MinimapProps {
  maze: MazeMap;
  playerPos: { x: number; y: number };
  clearedObstacleIds: Set<number>;
  onClose: () => void;
}

export const Minimap: React.FC<MinimapProps> = ({
  maze,
  playerPos,
  clearedObstacleIds,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = Math.max(3, Math.floor(140 / Math.max(maze.width, maze.height)));
    const w = maze.width * cellSize;
    const h = maze.height * cellSize;

    canvas.width = w;
    canvas.height = h;

    // Draw grid
    for (let r = 0; r < maze.height; r++) {
      for (let c = 0; c < maze.width; c++) {
        const cell = maze.grid[r][c];
        if (cell === 'wall') {
          ctx.fillStyle = '#334155';
        } else {
          ctx.fillStyle = '#0f172a';
        }
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }

    // Draw Start
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(maze.startX * cellSize, maze.startY * cellSize, cellSize, cellSize);

    // Draw Exit
    ctx.fillStyle = '#eab308';
    ctx.fillRect(maze.exitX * cellSize, maze.exitY * cellSize, cellSize, cellSize);

    // Draw Obstacles
    maze.obstacles.forEach(obs => {
      const isCleared = clearedObstacleIds.has(obs.id);
      ctx.fillStyle = isCleared ? '#10b981' : '#f59e0b';
      ctx.fillRect(obs.x * cellSize, obs.y * cellSize, cellSize, cellSize);
    });

    // Draw Player
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      playerPos.x * cellSize + cellSize / 2,
      playerPos.y * cellSize + cellSize / 2,
      Math.max(2, cellSize / 1.5),
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();

  }, [maze, playerPos, clearedObstacleIds]);

  return (
    <div className="absolute top-20 right-4 z-40 bg-slate-900/95 border-2 border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 border-b border-slate-700 pb-2 mb-2">
        <span className="font-pixel text-[10px] text-amber-400">RADAR MÊ CUNG</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs px-1 rounded bg-slate-800"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-center p-1 bg-slate-950 rounded border border-slate-800">
        <canvas ref={canvasRef} className="block pixelated" />
      </div>

      {/* Legend */}
      <div className="mt-2.5 space-y-1 text-[10px] font-sans-vn text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block border border-white"></span>
          <span>Học sinh (Bạn)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block"></span>
          <span>Chướng ngại vật chưa mở</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
          <span>Cổng đã vượt qua</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block"></span>
          <span>Cổng Đích (Lối thoát)</span>
        </div>
      </div>
    </div>
  );
};
