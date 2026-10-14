import React, { useEffect } from 'react';
import { LevelConfig, LEVELS } from '../data/questions';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Trophy, Star, ArrowRight, RotateCcw, Grid, BookOpen } from 'lucide-react';

interface VictoryModalProps {
  level: LevelConfig;
  score: number;
  clearedCount: number;
  totalObstacles: number;
  steps: number;
  seconds: number;
  onNextLevel: () => void;
  onRestart: () => void;
  onSelectLevel: () => void;
  onOpenHandbook: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  score,
  clearedCount,
  totalObstacles,
  steps,
  seconds,
  onNextLevel,
  onRestart,
  onSelectLevel,
  onOpenHandbook
}) => {
  useEffect(() => {
    soundManager.playVictory();
    
    // Multiple confetti bursts
    const end = Date.now() + 1200;
    const interval: NodeJS.Timeout = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins} phút ${s} giây`;
  };

  const currentIndex = LEVELS.findIndex(l => l.id === level.id);
  const nextLevel = currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border-4 border-yellow-500 rounded-2xl pixel-box-shadow shadow-2xl p-5 sm:p-7 text-slate-100 text-center overflow-hidden">
        
        {/* Trophy icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 mb-3 shadow-lg animate-bounce">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Title */}
        <span className="font-pixel text-xs text-yellow-400 uppercase tracking-widest">
          CHIẾN THẮNG MÊ CUNG!
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-sans-vn mt-1">
          {level.title} Hoàn Thành!
        </h2>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 my-4">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-md" />
          <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 drop-shadow-lg -translate-y-1" />
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-md" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-4 bg-slate-800/80 border border-slate-700 p-3 sm:p-4 rounded-xl text-left font-sans-vn">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Điểm số đạt được:</span>
            <span className="text-lg font-bold text-emerald-400 font-pixel">
              +{score.toFixed(2)} đ
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Chướng ngại vật:</span>
            <span className="text-lg font-bold text-amber-300 font-pixel">
              {clearedCount}/{totalObstacles} ải
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Thời gian vượt:</span>
            <span className="text-sm font-semibold text-cyan-300">
              {formatTime(seconds)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Tổng số bước:</span>
            <span className="text-sm font-semibold text-indigo-300">
              {steps} bước chân
            </span>
          </div>
        </div>

        {/* Assessment */}
        <p className="text-xs sm:text-sm text-emerald-300 font-medium mb-5 bg-emerald-950/40 border border-emerald-700/60 p-2.5 rounded-lg">
          🎉 Xuất sắc! Em đã trả lời đúng tất cả các câu hỏi và dẫn dắt bạn học sinh vượt qua mê cung an toàn!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          {nextLevel ? (
            <button
              onClick={onNextLevel}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-pixel text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold shadow-lg border-2 border-yellow-300 transition-transform active:scale-95"
            >
              <span>VÀO MÀN TIẾP THEO: {nextLevel.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs font-pixel text-amber-400 py-1">
              👑 EM ĐÃ CHINH PHỤC TẤT CẢ CÁC CẤP ĐỘ!
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-sans-vn font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi lại</span>
            </button>

            <button
              onClick={onSelectLevel}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-sans-vn font-semibold transition"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Chọn màn</span>
            </button>

            <button
              onClick={onOpenHandbook}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 text-xs font-sans-vn font-semibold transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sổ tay</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
