import React from 'react';
import { LEVELS, LevelConfig } from '../data/questions';
import { Trophy, Star, Play, Compass, X } from 'lucide-react';

interface LevelSelectModalProps {
  currentLevelId: string;
  onSelectLevel: (level: LevelConfig) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  currentLevelId,
  onSelectLevel,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border-4 border-amber-500/80 rounded-2xl pixel-box-shadow shadow-2xl p-4 sm:p-6 text-slate-100 max-h-[90vh] flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">
                CHỌN ĐỘ KHÓ & MÀN CHƠI
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans-vn">
                Bản Đồ Thử Thách Mê Cung
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 font-sans-vn">
          {LEVELS.map((lvl) => {
            const isCurrent = lvl.id === currentLevelId;
            const isMarathon = lvl.id === 'marathon';

            return (
              <div
                key={lvl.id}
                onClick={() => onSelectLevel(lvl)}
                className={`group p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-amber-950/30 border-amber-500 ring-2 ring-amber-400/40'
                    : isMarathon
                    ? 'bg-indigo-950/40 border-indigo-500/60 hover:border-indigo-400'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-pixel text-xs text-white shrink-0 mt-0.5 ${lvl.badgeColor}`}>
                    {lvl.id === 'marathon' ? '28' : lvl.id === 'easy' ? '1' : lvl.id === 'medium' ? '2' : lvl.id === 'hard' ? '3' : '4'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-xs text-amber-300">
                        {lvl.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-medium">
                        {lvl.difficultyLabel}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 border border-emerald-500">
                          ĐANG CHƠI
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {lvl.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                      {lvl.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-pixel text-xs transition-all shadow ${
                      isCurrent
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-700 group-hover:bg-teal-600 text-white'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCurrent ? 'CHƠI TIẾP' : 'BẮT ĐẦU'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="border-t-2 border-slate-700 pt-3 mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>* Toàn bộ 28 chướng ngại vật tương ứng 28 câu hỏi trắc nghiệm Tin học lớp 5</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-pixel text-xs"
          >
            ĐÓNG
          </button>
        </div>

      </div>
    </div>
  );
};
