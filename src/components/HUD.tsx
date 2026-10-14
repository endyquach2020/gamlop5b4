import React from 'react';
import { LevelConfig } from '../data/questions';
import { Direction } from '../types/game';
import { 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Map as MapIcon, 
  RotateCcw, 
  Grid, 
  Trophy, 
  Footprints, 
  Timer as TimerIcon,
  ShieldCheck,
  Maximize2,
  Crosshair,
  Gamepad2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HUDProps {
  level: LevelConfig;
  score: number;
  clearedCount: number;
  totalObstacles: number;
  steps: number;
  seconds: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenLevelSelect: () => void;
  onOpenHandbook: () => void;
  onRestartLevel: () => void;
  onMove: (dir: Direction) => void;
  showMinimap: boolean;
  onToggleMinimap: () => void;
  viewMode: 'fit' | 'follow';
  onToggleViewMode: () => void;
  showDpad: boolean;
  onToggleDpad: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  level,
  score,
  clearedCount,
  totalObstacles,
  steps,
  seconds,
  isMuted,
  onToggleMute,
  onOpenLevelSelect,
  onOpenHandbook,
  onRestartLevel,
  onMove,
  showMinimap,
  onToggleMinimap,
  viewMode,
  onToggleViewMode,
  showDpad,
  onToggleDpad
}) => {
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const percent = Math.round((clearedCount / totalObstacles) * 100);

  return (
    <>
      {/* Top Header Bar (Fixed at top, does NOT cover maze canvas) */}
      <header className="h-14 sm:h-16 px-2 sm:px-4 bg-slate-900 border-b-2 border-slate-800 shadow-md flex items-center justify-between gap-2 shrink-0 z-20 font-sans-vn">
        
        {/* Left: Level name & Question count badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenLevelSelect}
            className="flex items-center gap-2 text-left p-1 rounded-lg hover:bg-slate-800 transition"
            title="Nhấp để đổi cấp độ"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0 ${level.badgeColor}`}>
              {level.id === 'marathon' ? '28' : level.id === 'easy' ? '1' : level.id === 'medium' ? '2' : level.id === 'hard' ? '3' : '4'}
            </div>
            <div className="hidden xs:flex flex-col">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                {level.name}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                {level.title}
              </span>
            </div>
          </button>

          {/* Obstacle counter badge */}
          <div className="bg-slate-800/90 border border-slate-700 px-2 sm:px-2.5 py-1 rounded-lg flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className={`w-4 h-4 shrink-0 ${clearedCount === totalObstacles ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                Chướng ngại vật
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-pixel">
                {clearedCount}/{totalObstacles}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Progress & Score & Time */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress bar */}
          <div className="hidden md:flex flex-col w-24 lg:w-32">
            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-0.5">
              <span>Tiến độ</span>
              <span className="font-pixel text-[9px] text-emerald-400">{percent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Score */}
          <div className="bg-amber-950/40 border border-amber-600/60 px-2.5 sm:px-3 py-1 rounded-lg flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-pixel text-xs sm:text-sm font-bold text-amber-300">
              {score.toFixed(2)} đ
            </span>
          </div>

          {/* Timer */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-pixel text-slate-300">
            <TimerIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{formatTime(seconds)}</span>
          </div>

          {/* Steps */}
          <div className="hidden xl:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-xs text-slate-300 font-bold">
            <Footprints className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{steps} bước</span>
          </div>
        </div>

        {/* Right Actions Toolbar */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* View Mode Toggle: Fit vs Follow */}
          <button
            onClick={onToggleViewMode}
            className={`p-1.5 sm:p-2 rounded-lg border transition flex items-center gap-1 text-xs font-bold ${
              viewMode === 'fit'
                ? 'bg-teal-900/60 border-teal-500 text-teal-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
            title={viewMode === 'fit' ? "Đang bật: Toàn cảnh (Nhấp để Phóng to)" : "Đang bật: Cận cảnh (Nhấp để Xem toàn cảnh)"}
          >
            {viewMode === 'fit' ? <Maximize2 className="w-4 h-4" /> : <Crosshair className="w-4 h-4" />}
            <span className="hidden lg:inline text-[11px]">
              {viewMode === 'fit' ? 'Toàn cảnh' : 'Cận cảnh'}
            </span>
          </button>

          {/* D-Pad Toggle */}
          <button
            onClick={onToggleDpad}
            className={`p-1.5 sm:p-2 rounded-lg border transition ${
              showDpad
                ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
            }`}
            title={showDpad ? "Ẩn phím ảo D-Pad" : "Hiện phím ảo D-Pad"}
          >
            <Gamepad2 className="w-4 h-4" />
          </button>

          {/* Sound Mute */}
          <button
            onClick={onToggleMute}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Minimap Toggle */}
          <button
            onClick={onToggleMinimap}
            className={`p-1.5 sm:p-2 rounded-lg border transition ${
              showMinimap 
                ? 'bg-teal-900/60 border-teal-500 text-teal-300' 
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
            title="Bật/Tắt Bản đồ thu nhỏ"
          >
            <MapIcon className="w-4 h-4" />
          </button>

          {/* Handbook */}
          <button
            onClick={onOpenHandbook}
            className="p-1.5 sm:p-2 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700 text-indigo-300 hover:text-white transition flex items-center gap-1 text-xs font-bold"
            title="Sổ tay lý thuyết 28 câu hỏi"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">LÝ THUYẾT</span>
          </button>

          {/* Restart */}
          <button
            onClick={onRestartLevel}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
            title="Chơi lại màn này"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Level Select */}
          <button
            onClick={onOpenLevelSelect}
            className="p-1.5 sm:p-2 rounded-lg bg-amber-500 hover:bg-amber-400 border border-amber-300 text-slate-950 font-bold transition flex items-center gap-1 text-xs shadow"
            title="Chọn cấp độ"
          >
            <Grid className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">CẤP ĐỘ</span>
          </button>
        </div>
      </header>

      {/* Gameplay Helper Bottom Left Banner */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 px-3 py-2 rounded-xl text-xs text-slate-200 shadow-2xl font-sans-vn max-w-sm sm:max-w-md">
        <span className="font-bold text-amber-400 shrink-0">💡 HƯỚNG DẪN:</span>
        <span className="leading-snug">
          Nhấp chuột trực tiếp vào <strong>Chướng ngại vật [!]</strong> để mở câu hỏi, hoặc dùng các nút <strong>Mũi tên</strong> / <strong>[W A S D]</strong> để di chuyển.
        </span>
      </div>

      {/* On-screen Retro D-Pad (Toggleable, sits cleanly in bottom right) */}
      {showDpad && (
        <div className="absolute bottom-3 right-3 z-30 p-1 bg-slate-950/90 backdrop-blur-md rounded-2xl border-2 border-slate-700 shadow-2xl select-none">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            {/* UP */}
            <button
              onClick={() => onMove('up')}
              className="absolute top-0.5 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 active:bg-amber-600 border border-slate-600 active:border-amber-400 rounded-lg flex items-center justify-center text-slate-200 active:text-white shadow transition-transform active:scale-95"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            {/* DOWN */}
            <button
              onClick={() => onMove('down')}
              className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 active:bg-amber-600 border border-slate-600 active:border-amber-400 rounded-lg flex items-center justify-center text-slate-200 active:text-white shadow transition-transform active:scale-95"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            {/* LEFT */}
            <button
              onClick={() => onMove('left')}
              className="absolute top-1/2 left-0.5 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 active:bg-amber-600 border border-slate-600 active:border-amber-400 rounded-lg flex items-center justify-center text-slate-200 active:text-white shadow transition-transform active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* RIGHT */}
            <button
              onClick={() => onMove('right')}
              className="absolute top-1/2 right-0.5 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 active:bg-amber-600 border border-slate-600 active:border-amber-400 rounded-lg flex items-center justify-center text-slate-200 active:text-white shadow transition-transform active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {/* CENTER LOGO */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">
              🎒
            </div>
          </div>
        </div>
      )}
    </>
  );
};
