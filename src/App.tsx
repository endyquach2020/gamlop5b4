import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PixelCanvas } from './components/PixelCanvas';
import { HUD } from './components/HUD';
import { QuestionModal } from './components/QuestionModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { VictoryModal } from './components/VictoryModal';
import { StudyHandbookModal } from './components/StudyHandbookModal';
import { Minimap } from './components/Minimap';
import { LEVELS, LevelConfig, QUESTIONS_DATA } from './data/questions';
import { generateMaze } from './utils/mazeGenerator';
import { MazeMap, Direction, ObstacleInstance } from './types/game';
import { soundManager } from './utils/audio';

export default function App() {
  // Current active level configuration
  const [currentLevel, setCurrentLevel] = useState<LevelConfig>(LEVELS[0]);

  // View mode: 'fit' (overview of full maze centered) or 'follow' (zoom in on player)
  const [viewMode, setViewMode] = useState<'fit' | 'follow'>('fit');

  // D-Pad display toggle (Enabled by default on all devices so anyone can click to move)
  const [showDpad, setShowDpad] = useState<boolean>(true);

  // Generated maze state
  const [maze, setMaze] = useState<MazeMap>(() =>
    generateMaze(LEVELS[0].gridWidth, LEVELS[0].gridHeight, LEVELS[0].questionIds)
  );

  // Player state
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1
  });
  const [playerDir, setPlayerDir] = useState<Direction>('down');
  const [walkFrame, setWalkFrame] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Timer
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Cleared obstacles
  const [clearedObstacleIds, setClearedObstacleIds] = useState<Set<number>>(new Set());

  // Interactive Question Modal State
  const [activeObstacle, setActiveObstacle] = useState<ObstacleInstance | null>(null);

  // UI Modals
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [showMinimap, setShowMinimap] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.getMuted());
  const [warningToast, setWarningToast] = useState<string | null>(null);

  // Auto-focus on window on mount so keyboard arrows immediately work
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.focus();
    }
  }, []);

  // Check if all obstacles are cleared
  const allCleared = useMemo(() => {
    return maze.obstacles.length > 0 && clearedObstacleIds.size === maze.obstacles.length;
  }, [maze.obstacles.length, clearedObstacleIds.size]);

  // Initialize or reset level
  const initLevel = useCallback((levelConfig: LevelConfig) => {
    setCurrentLevel(levelConfig);
    const newMaze = generateMaze(
      levelConfig.gridWidth,
      levelConfig.gridHeight,
      levelConfig.questionIds
    );
    setMaze(newMaze);
    setPlayerPos({ x: newMaze.startX, y: newMaze.startY });
    setPlayerDir('down');
    setWalkFrame(0);
    setSteps(0);
    setScore(0);
    setSeconds(0);
    setIsTimerRunning(true);
    setClearedObstacleIds(new Set());
    setActiveObstacle(null);
    setIsVictoryOpen(false);
    setIsLevelSelectOpen(false);
  }, []);

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Movement Logic
  const handleMove = useCallback(
    (dir: Direction) => {
      if (activeObstacle || isVictoryOpen || isLevelSelectOpen || isHandbookOpen) {
        return;
      }

      setPlayerDir(dir);
      setWalkFrame(prev => prev + 1);

      let dx = 0;
      let dy = 0;
      if (dir === 'up') dy = -1;
      if (dir === 'down') dy = 1;
      if (dir === 'left') dx = -1;
      if (dir === 'right') dx = 1;

      const nx = playerPos.x + dx;
      const ny = playerPos.y + dy;

      // Check bounds
      if (nx < 0 || nx >= maze.width || ny < 0 || ny >= maze.height) {
        soundManager.playBump();
        return;
      }

      const targetCell = maze.grid[ny][nx];

      // 1. Wall collision
      if (targetCell === 'wall') {
        soundManager.playBump();
        return;
      }

      // 2. Obstacle collision
      if (targetCell === 'obstacle') {
        const obs = maze.obstacles.find(o => o.x === nx && o.y === ny);
        if (obs) {
          if (!clearedObstacleIds.has(obs.id)) {
            // Obstacle is locked! Open question challenge
            setActiveObstacle(obs);
            return;
          }
          // If already cleared, player can walk through
        }
      }

      // 3. Gem pickup
      if (targetCell === 'gem') {
        maze.grid[ny][nx] = 'path';
        setScore(s => Math.round((s + 0.1) * 100) / 100);
        soundManager.playCorrect();
      }

      // 4. Exit portal collision
      if (nx === maze.exitX && ny === maze.exitY) {
        if (!allCleared) {
          soundManager.playBump();
          const remain = maze.obstacles.length - clearedObstacleIds.size;
          setWarningToast(
            `Cổng Đích đang khoá! Bạn cần vượt qua ${remain} chướng ngại vật còn lại trong mê cung!`
          );
          setTimeout(() => setWarningToast(null), 3000);
          return;
        } else {
          // Victory!
          setPlayerPos({ x: nx, y: ny });
          setSteps(s => s + 1);
          soundManager.playStep();
          setIsTimerRunning(false);
          setIsVictoryOpen(true);
          return;
        }
      }

      // Valid move
      setPlayerPos({ x: nx, y: ny });
      setSteps(s => s + 1);
      soundManager.playStep();
    },
    [
      playerPos,
      maze,
      clearedObstacleIds,
      allCleared,
      activeObstacle,
      isVictoryOpen,
      isLevelSelectOpen,
      isHandbookOpen
    ]
  );

  // Global Keyboard listener for WASD and Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleMove('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleMove('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleMove('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleMove('right');
      } else if (e.key === 'm' || e.key === 'M') {
        setShowMinimap(prev => !prev);
      } else if (e.key === 'v' || e.key === 'V') {
        setViewMode(prev => (prev === 'fit' ? 'follow' : 'fit'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  // When student answers an obstacle correctly
  const handleObstacleCorrect = (obstacleId: number, scoreAwarded: number) => {
    setClearedObstacleIds(prev => {
      const next = new Set(prev);
      next.add(obstacleId);
      return next;
    });
    setScore(s => Math.round((s + scoreAwarded) * 100) / 100);

    // Also advance student onto that cleared obstacle tile
    if (activeObstacle) {
      setPlayerPos({ x: activeObstacle.x, y: activeObstacle.y });
      setSteps(s => s + 1);
    }
    setActiveObstacle(null);
  };

  // Sound toggle
  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Next level handler
  const handleNextLevel = () => {
    const currentIndex = LEVELS.findIndex(l => l.id === currentLevel.id);
    if (currentIndex < LEVELS.length - 1) {
      initLevel(LEVELS[currentIndex + 1]);
    } else {
      initLevel(LEVELS[0]);
    }
  };

  // Find question object for active obstacle
  const activeQuestion = activeObstacle
    ? QUESTIONS_DATA.find(q => q.id === activeObstacle.questionId) || null
    : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col font-sans-vn select-none">
      
      {/* Top Header Bar (Fixed at top, strictly outside canvas) */}
      <HUD
        level={currentLevel}
        score={score}
        clearedCount={clearedObstacleIds.size}
        totalObstacles={maze.obstacles.length}
        steps={steps}
        seconds={seconds}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onRestartLevel={() => initLevel(currentLevel)}
        onMove={handleMove}
        showMinimap={showMinimap}
        onToggleMinimap={() => setShowMinimap(prev => !prev)}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => (prev === 'fit' ? 'follow' : 'fit'))}
        showDpad={showDpad}
        onToggleDpad={() => setShowDpad(prev => !prev)}
      />

      {/* Main Playable Game Container (flex-1, centered canvas) */}
      <main className="flex-1 relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {/* 2D Pixel Art Canvas Game View */}
        <PixelCanvas
          maze={maze}
          level={currentLevel}
          playerPos={playerPos}
          playerDir={playerDir}
          walkFrame={walkFrame}
          clearedObstacleIds={clearedObstacleIds}
          onObstacleHit={(obsId) => {
            const obs = maze.obstacles.find(o => o.id === obsId);
            if (obs) {
              if (!clearedObstacleIds.has(obs.id)) {
                setActiveObstacle(obs);
              } else {
                setWarningToast(`Chướng ngại vật C${obs.questionId} đã vượt qua thành công!`);
                setTimeout(() => setWarningToast(null), 2000);
              }
            }
          }}
          onExitReached={() => {
            if (allCleared && !isVictoryOpen) {
              setIsTimerRunning(false);
              setIsVictoryOpen(true);
            }
          }}
          allCleared={allCleared}
          viewMode={viewMode}
          onMove={handleMove}
        />

        {/* Retro Scanline effect overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 scanline opacity-20" />

        {/* Floating Minimap Radar */}
        {showMinimap && (
          <Minimap
            maze={maze}
            playerPos={playerPos}
            clearedObstacleIds={clearedObstacleIds}
            onClose={() => setShowMinimap(false)}
          />
        )}

        {/* Warning Toast Notification (e.g. Exit is locked) */}
        {warningToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-rose-900/90 text-rose-100 border-2 border-rose-500 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
            <span>⚠️</span>
            <span>{warningToast}</span>
          </div>
        )}
      </main>

      {/* Interactive Question / Obstacle Dialogue Modal */}
      {activeObstacle && activeQuestion && (
        <QuestionModal
          question={activeQuestion}
          obstacleId={activeObstacle.id}
          onCorrect={handleObstacleCorrect}
          onClose={() => setActiveObstacle(null)}
        />
      )}

      {/* Level Selection Modal */}
      {isLevelSelectOpen && (
        <LevelSelectModal
          currentLevelId={currentLevel.id}
          onSelectLevel={lvl => initLevel(lvl)}
          onClose={() => setIsLevelSelectOpen(false)}
        />
      )}

      {/* Victory Level Clear Modal */}
      {isVictoryOpen && (
        <VictoryModal
          level={currentLevel}
          score={score}
          clearedCount={clearedObstacleIds.size}
          totalObstacles={maze.obstacles.length}
          steps={steps}
          seconds={seconds}
          onNextLevel={handleNextLevel}
          onRestart={() => initLevel(currentLevel)}
          onSelectLevel={() => {
            setIsVictoryOpen(false);
            setIsLevelSelectOpen(true);
          }}
          onOpenHandbook={() => {
            setIsVictoryOpen(false);
            setIsHandbookOpen(true);
          }}
        />
      )}

      {/* Study Handbook (Sổ tay 28 câu hỏi Tin học 5) Modal */}
      {isHandbookOpen && (
        <StudyHandbookModal onClose={() => setIsHandbookOpen(false)} />
      )}

    </div>
  );
}
