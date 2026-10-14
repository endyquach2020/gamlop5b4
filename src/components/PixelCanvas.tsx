import React, { useEffect, useRef } from 'react';
import { MazeMap, Direction } from '../types/game';
import { LevelConfig, QUESTIONS_DATA } from '../data/questions';

interface PixelCanvasProps {
  maze: MazeMap;
  level: LevelConfig;
  playerPos: { x: number; y: number };
  playerDir: Direction;
  walkFrame: number;
  clearedObstacleIds: Set<number>;
  onObstacleHit: (obstacleId: number, questionId: number) => void;
  onExitReached: () => void;
  allCleared: boolean;
  viewMode: 'fit' | 'follow'; // 'fit' = fit entire maze centered, 'follow' = zoom in & follow player
  onMove?: (dir: Direction) => void;
}

export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  maze,
  level,
  playerPos,
  playerDir,
  walkFrame,
  clearedObstacleIds,
  onObstacleHit,
  onExitReached,
  allCleared,
  viewMode,
  onMove
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const renderCoordsRef = useRef<{ viewOffsetX: number; viewOffsetY: number; tileSize: number }>({
    viewOffsetX: 0,
    viewOffsetY: 0,
    tileSize: 0
  });

  // Camera coordinates (for follow mode)
  const cameraRef = useRef<{ x: number; y: number }>({ x: playerPos.x, y: playerPos.y });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.imageSmoothingEnabled = false;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Main Render Loop
  useEffect(() => {
    let active = true;

    const render = () => {
      if (!active) return;
      timeRef.current += 0.04;
      const time = timeRef.current;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayW = canvas.width / dpr;
      const displayH = canvas.height / dpr;

      if (displayW <= 0 || displayH <= 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;

      // Clear full background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, displayW, displayH);

      // Determine Tile Size and View Offset
      let tileSize: number;
      let viewOffsetX: number;
      let viewOffsetY: number;

      const margin = 24;
      const availW = Math.max(100, displayW - margin * 2);
      const availH = Math.max(100, displayH - margin * 2);

      // Calculate the size if fitting the entire maze
      const fitTileSize = Math.max(
        16,
        Math.floor(Math.min(availW / maze.width, availH / maze.height))
      );

      if (viewMode === 'fit') {
        // FIT MODE: Entire maze fits on screen and is 100% centered!
        tileSize = Math.min(fitTileSize, 56);
        const mazePixelW = maze.width * tileSize;
        const mazePixelH = maze.height * tileSize;
        viewOffsetX = Math.floor((displayW - mazePixelW) / 2);
        viewOffsetY = Math.floor((displayH - mazePixelH) / 2);
      } else {
        // FOLLOW MODE: Larger tiles (at least 42px) with camera centered on player, clamped to bounds
        tileSize = Math.max(42, fitTileSize);
        const mazePixelW = maze.width * tileSize;
        const mazePixelH = maze.height * tileSize;

        // Smooth camera lerp
        cameraRef.current.x += (playerPos.x - cameraRef.current.x) * 0.18;
        cameraRef.current.y += (playerPos.y - cameraRef.current.y) * 0.18;

        // Horizontal: if maze fits within screen, center it! Otherwise follow player and clamp.
        if (mazePixelW <= displayW) {
          viewOffsetX = Math.floor((displayW - mazePixelW) / 2);
        } else {
          const targetX = displayW / 2 - (cameraRef.current.x + 0.5) * tileSize;
          const minX = displayW - mazePixelW - margin;
          const maxX = margin;
          viewOffsetX = Math.floor(Math.max(minX, Math.min(maxX, targetX)));
        }

        // Vertical: if maze fits within screen, center it! Otherwise follow player and clamp.
        if (mazePixelH <= displayH) {
          viewOffsetY = Math.floor((displayH - mazePixelH) / 2);
        } else {
          const targetY = displayH / 2 - (cameraRef.current.y + 0.5) * tileSize;
          const minY = displayH - mazePixelH - margin;
          const maxY = margin;
          viewOffsetY = Math.floor(Math.max(minY, Math.min(maxY, targetY)));
        }
      }

      renderCoordsRef.current = { viewOffsetX, viewOffsetY, tileSize };

      // Theme colors
      const themeColors = {
        forest: {
          wallTop: '#15803d',
          wallFace: '#14532d',
          wallEdge: '#22c55e',
          floor1: '#1e293b',
          floor2: '#0f172a',
          accent: '#22c55e'
        },
        ruins: {
          wallTop: '#b45309',
          wallFace: '#78350f',
          wallEdge: '#f59e0b',
          floor1: '#27272a',
          floor2: '#18181b',
          accent: '#eab308'
        },
        cyber: {
          wallTop: '#1d4ed8',
          wallFace: '#1e3a8a',
          wallEdge: '#3b82f6',
          floor1: '#0f172a',
          floor2: '#090d16',
          accent: '#06b6d4'
        },
        sanctuary: {
          wallTop: '#7e22ce',
          wallFace: '#581c87',
          wallEdge: '#a855f7',
          floor1: '#18181b',
          floor2: '#09090b',
          accent: '#c084fc'
        },
        grand: {
          wallTop: '#4338ca',
          wallFace: '#312e81',
          wallEdge: '#6366f1',
          floor1: '#1e1e24',
          floor2: '#121217',
          accent: '#f59e0b'
        }
      }[level.theme || 'forest'];

      // Draw subtle shadow behind the maze border
      const mazeW = maze.width * tileSize;
      const mazeH = maze.height * tileSize;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(viewOffsetX + 6, viewOffsetY + 6, mazeW, mazeH);

      // Determine visible grid bounds
      const minCol = Math.max(0, Math.floor(-viewOffsetX / tileSize) - 1);
      const maxCol = Math.min(maze.width - 1, Math.ceil((displayW - viewOffsetX) / tileSize) + 1);
      const minRow = Math.max(0, Math.floor(-viewOffsetY / tileSize) - 1);
      const maxRow = Math.min(maze.height - 1, Math.ceil((displayH - viewOffsetY) / tileSize) + 1);

      // 1. Draw Floor tiles
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const px = Math.floor(viewOffsetX + c * tileSize);
          const py = Math.floor(viewOffsetY + r * tileSize);

          const isEven = (r + c) % 2 === 0;
          ctx.fillStyle = isEven ? themeColors.floor1 : themeColors.floor2;
          ctx.fillRect(px, py, tileSize, tileSize);

          // Floor seam lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 1;
          ctx.strokeRect(px, py, tileSize, tileSize);

          // Subtle stone dot
          if ((c * 17 + r * 31) % 19 === 0 && tileSize > 24) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.fillRect(px + tileSize * 0.35, py + tileSize * 0.45, 2, 2);
          }
        }
      }

      // 2. Draw Start Tile
      {
        const spx = Math.floor(viewOffsetX + maze.startX * tileSize);
        const spy = Math.floor(viewOffsetY + maze.startY * tileSize);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.28)';
        ctx.fillRect(spx, spy, tileSize, tileSize);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(spx + 1, spy + 1, tileSize - 2, tileSize - 2);

        // Start Compass Icon
        if (tileSize >= 22) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(spx + tileSize * 0.42, spy + tileSize * 0.2, tileSize * 0.16, tileSize * 0.6);
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(spx + tileSize * 0.5, spy + tileSize * 0.2, tileSize * 0.3, tileSize * 0.25);
        }
      }

      // 3. Draw Exit Portal
      {
        const epx = Math.floor(viewOffsetX + maze.exitX * tileSize);
        const epy = Math.floor(viewOffsetY + maze.exitY * tileSize);

        if (allCleared) {
          // Open glowing golden portal
          const pulse = Math.sin(time * 5) * 3;
          ctx.fillStyle = 'rgba(234, 179, 8, 0.4)';
          ctx.beginPath();
          ctx.arc(epx + tileSize / 2, epy + tileSize / 2, Math.max(4, tileSize / 2 + pulse), 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Golden Trophy Icon
          if (tileSize >= 20) {
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(epx + tileSize * 0.3, epy + tileSize * 0.3, tileSize * 0.4, tileSize * 0.4);
            ctx.fillStyle = '#ca8a04';
            ctx.fillRect(epx + tileSize * 0.4, epy + tileSize * 0.6, tileSize * 0.2, tileSize * 0.2);
          }
        } else {
          // Locked Exit Gate
          ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.fillRect(epx, epy, tileSize, tileSize);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(epx + 2, epy + 2, tileSize - 4, tileSize - 4);

          if (tileSize >= 20) {
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(epx + tileSize * 0.35, epy + tileSize * 0.4, tileSize * 0.3, tileSize * 0.35);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(epx + tileSize * 0.4, epy + tileSize * 0.25, tileSize * 0.2, tileSize * 0.2);
          }
        }
      }

      // 4. Draw Gems / Bonus items
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          if (maze.grid[r][c] === 'gem') {
            const gpx = Math.floor(viewOffsetX + c * tileSize);
            const gpy = Math.floor(viewOffsetY + r * tileSize);
            const bob = Math.sin(time * 4 + c + r) * 2;

            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.moveTo(gpx + tileSize / 2, gpy + tileSize * 0.25 + bob);
            ctx.lineTo(gpx + tileSize * 0.75, gpy + tileSize / 2 + bob);
            ctx.lineTo(gpx + tileSize / 2, gpy + tileSize * 0.75 + bob);
            ctx.lineTo(gpx + tileSize * 0.25, gpy + tileSize / 2 + bob);
            ctx.closePath();
            ctx.fill();

            if (tileSize > 22) {
              ctx.fillStyle = '#a7f3d0';
              ctx.fillRect(gpx + tileSize * 0.45, gpy + tileSize * 0.35 + bob, 2, 2);
            }
          }
        }
      }

      // 5. Draw Obstacles
      maze.obstacles.forEach(obs => {
        const opx = Math.floor(viewOffsetX + obs.x * tileSize);
        const opy = Math.floor(viewOffsetY + obs.y * tileSize);
        const isCleared = clearedObstacleIds.has(obs.id);
        const qData = QUESTIONS_DATA.find(q => q.id === obs.questionId);

        if (isCleared) {
          // Cleared Obstacle: Open green portal
          ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
          ctx.fillRect(opx, opy, tileSize, tileSize);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(opx + 2, opy + 2, tileSize - 4, tileSize - 4);

          ctx.fillStyle = '#34d399';
          ctx.fillRect(opx + tileSize * 0.4, opy + tileSize * 0.4, tileSize * 0.2, tileSize * 0.2);
        } else {
          // UNCLEARED OBSTACLE: Mighty Pixel Barrier
          const pulse = Math.sin(time * 3 + obs.id) * 2;

          // Outer barrier box
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(opx + 1, opy + 1, tileSize - 2, tileSize - 2);

          // Inner magic color
          ctx.fillStyle = obs.questionId >= 25 ? '#7e22ce' : '#d97706';
          ctx.fillRect(opx + 3, opy + 3, tileSize - 6, tileSize - 6);

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(opx + 1, opy + 1, tileSize - 2, tileSize - 2);

          // Obstacle Icon
          if (tileSize >= 22) {
            ctx.font = `${Math.floor(tileSize * 0.48)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              qData ? qData.obstacleIcon : '🔒',
              opx + tileSize / 2,
              opy + tileSize / 2
            );
          }

          // Animated '!' Exclamation badge
          const badgeY = opy - 5 + pulse;
          const badgeW = Math.max(12, Math.floor(tileSize * 0.45));
          const badgeH = Math.max(10, Math.floor(tileSize * 0.38));

          ctx.fillStyle = '#ef4444';
          ctx.fillRect(opx + tileSize / 2 - badgeW / 2, badgeY - badgeH, badgeW, badgeH);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.strokeRect(opx + tileSize / 2 - badgeW / 2, badgeY - badgeH, badgeW, badgeH);

          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(7, Math.floor(tileSize * 0.25))}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('!', opx + tileSize / 2, badgeY - badgeH / 2);

          // Question ID label (e.g. C1, C28)
          if (tileSize >= 24) {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(opx + 2, opy + tileSize - 8, tileSize - 4, 7);
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 7px sans-serif';
            ctx.fillText(`C${obs.questionId}`, opx + tileSize / 2, opy + tileSize - 4);
          }
        }
      });

      // 6. Draw Walls (Clean 3D Pixel block effect)
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          if (maze.grid[r][c] === 'wall') {
            const wpx = Math.floor(viewOffsetX + c * tileSize);
            const wpy = Math.floor(viewOffsetY + r * tileSize);
            const depth = Math.max(2, Math.floor(tileSize * 0.2));

            // Wall Face (front side)
            ctx.fillStyle = themeColors.wallFace;
            ctx.fillRect(wpx, wpy, tileSize, tileSize);

            // Wall Top (highlighted block)
            ctx.fillStyle = themeColors.wallTop;
            ctx.fillRect(wpx, wpy, tileSize, tileSize - depth);

            // Highlight top/left edges
            ctx.fillStyle = themeColors.wallEdge;
            ctx.fillRect(wpx, wpy, tileSize, 1);
            ctx.fillRect(wpx, wpy, 1, tileSize - depth);

            // Subtle brick lines
            if (tileSize >= 26) {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
              ctx.fillRect(wpx + tileSize * 0.5, wpy + 1, 1, tileSize - depth - 1);
              ctx.fillRect(wpx, wpy + (tileSize - depth) * 0.5, tileSize, 1);
            }
          }
        }
      }

      // Outer Border around entire maze
      ctx.strokeStyle = themeColors.wallEdge;
      ctx.lineWidth = 2;
      ctx.strokeRect(viewOffsetX, viewOffsetY, mazeW, mazeH);

      // 7. Draw Player Character (Student)
      {
        const ppx = Math.floor(viewOffsetX + playerPos.x * tileSize);
        const ppy = Math.floor(viewOffsetY + playerPos.y * tileSize);

        // Player Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(
          ppx + tileSize / 2,
          ppy + tileSize * 0.88,
          tileSize * 0.35,
          tileSize * 0.14,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Walking leg offset animation
        const legOffset = (walkFrame % 2 === 1) ? 2 : -2;

        // Legs (dark pants)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(ppx + tileSize * 0.3, ppy + tileSize * 0.72 + legOffset, tileSize * 0.15, tileSize * 0.2);
        ctx.fillRect(ppx + tileSize * 0.55, ppy + tileSize * 0.72 - legOffset, tileSize * 0.15, tileSize * 0.2);

        // Shoes (white sneakers)
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(ppx + tileSize * 0.28, ppy + tileSize * 0.88 + legOffset, tileSize * 0.18, tileSize * 0.08);
        ctx.fillRect(ppx + tileSize * 0.54, ppy + tileSize * 0.88 - legOffset, tileSize * 0.18, tileSize * 0.08);

        // Torso (Cyan/Blue Student Uniform)
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(ppx + tileSize * 0.26, ppy + tileSize * 0.45, tileSize * 0.48, tileSize * 0.3);

        // Orange Backpack
        ctx.fillStyle = '#ea580c';
        if (playerDir === 'up') {
          ctx.fillRect(ppx + tileSize * 0.3, ppy + tileSize * 0.44, tileSize * 0.4, tileSize * 0.26);
          ctx.fillStyle = '#c2410c';
          ctx.fillRect(ppx + tileSize * 0.35, ppy + tileSize * 0.48, tileSize * 0.3, tileSize * 0.15);
        } else if (playerDir === 'left') {
          ctx.fillRect(ppx + tileSize * 0.56, ppy + tileSize * 0.46, tileSize * 0.18, tileSize * 0.24);
        } else if (playerDir === 'right') {
          ctx.fillRect(ppx + tileSize * 0.26, ppy + tileSize * 0.46, tileSize * 0.18, tileSize * 0.24);
        } else {
          ctx.fillStyle = '#ea580c';
          ctx.fillRect(ppx + tileSize * 0.32, ppy + tileSize * 0.45, 2, tileSize * 0.28);
          ctx.fillRect(ppx + tileSize * 0.64, ppy + tileSize * 0.45, 2, tileSize * 0.28);
        }

        // Student Head & Face
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(ppx + tileSize * 0.3, ppy + tileSize * 0.22, tileSize * 0.4, tileSize * 0.25);

        // Red Student Cap
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(ppx + tileSize * 0.26, ppy + tileSize * 0.14, tileSize * 0.48, tileSize * 0.12);
        if (playerDir === 'left') {
          ctx.fillRect(ppx + tileSize * 0.18, ppy + tileSize * 0.22, tileSize * 0.18, 3);
        } else if (playerDir === 'right') {
          ctx.fillRect(ppx + tileSize * 0.64, ppy + tileSize * 0.22, tileSize * 0.18, 3);
        } else if (playerDir === 'down') {
          ctx.fillRect(ppx + tileSize * 0.24, ppy + tileSize * 0.24, tileSize * 0.52, 3);
        }

        // Eyes
        ctx.fillStyle = '#0f172a';
        if (playerDir === 'down') {
          ctx.fillRect(ppx + tileSize * 0.38, ppy + tileSize * 0.3, 3, 4);
          ctx.fillRect(ppx + tileSize * 0.58, ppy + tileSize * 0.3, 3, 4);
        } else if (playerDir === 'left') {
          ctx.fillRect(ppx + tileSize * 0.34, ppy + tileSize * 0.3, 3, 4);
        } else if (playerDir === 'right') {
          ctx.fillRect(ppx + tileSize * 0.62, ppy + tileSize * 0.3, 3, 4);
        }
      }

      ctx.restore();

      // Check exit trigger
      if (playerPos.x === maze.exitX && playerPos.y === maze.exitY) {
        onExitReached();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    maze,
    level,
    playerPos,
    playerDir,
    walkFrame,
    clearedObstacleIds,
    allCleared,
    viewMode,
    onExitReached
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (typeof window !== 'undefined') {
      window.focus();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const { viewOffsetX, viewOffsetY, tileSize } = renderCoordsRef.current;
    if (tileSize <= 0) return;

    const tileX = Math.floor((clickX - viewOffsetX) / tileSize);
    const tileY = Math.floor((clickY - viewOffsetY) / tileSize);

    if (tileX < 0 || tileX >= maze.width || tileY < 0 || tileY >= maze.height) {
      return;
    }

    // Check if clicked directly on an obstacle
    const clickedObs = maze.obstacles.find(o => o.x === tileX && o.y === tileY);
    if (clickedObs) {
      onObstacleHit(clickedObs.id, clickedObs.questionId);
      return;
    }

    // Otherwise move in direction of click
    const dx = tileX - playerPos.x;
    const dy = tileY - playerPos.y;

    if (dx === 0 && dy === 0) return;

    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx > 0) onMove?.('right');
      else if (dx < 0) onMove?.('left');
    } else {
      if (dy > 0) onMove?.('down');
      else if (dy < 0) onMove?.('up');
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full block cursor-pointer select-none touch-none pixelated"
      />
    </div>
  );
};
