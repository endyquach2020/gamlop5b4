import React, { useState, useEffect } from 'react';
import { Question } from '../data/questions';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface QuestionModalProps {
  question: Question;
  obstacleId: number;
  onCorrect: (obstacleId: number, scoreAwarded: number) => void;
  onClose: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  obstacleId,
  onCorrect,
  onClose
}) => {
  // MCQ state
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  
  // TF state
  const [tfAnswers, setTfAnswers] = useState<Record<string, 'Đ' | 'S'>>({});
  
  // Status
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [scoreAwarded, setScoreAwarded] = useState<number>(0);

  // Play encounter sound once on mount
  useEffect(() => {
    soundManager.playEncounter();
  }, []);

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status === 'correct') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          handlePassThrough();
        }
        return;
      }

      if (question.type === 'mcq' && status === 'idle') {
        const key = e.key.toUpperCase();
        if (key === 'A' || key === '1') handleSelectOption('A');
        if (key === 'B' || key === '2') handleSelectOption('B');
        if (key === 'C' || key === '3') handleSelectOption('C');
        if (key === 'D' || key === '4') handleSelectOption('D');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, question.type]);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (status === 'correct') return;
    setSelectedOption(key);

    if (key === question.answer) {
      soundManager.playCorrect();
      soundManager.playBarrierCleared();
      setStatus('correct');
      setScoreAwarded(question.score);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      soundManager.playWrong();
      setStatus('wrong');
    }
  };

  const handleTfChoice = (subId: string, val: 'Đ' | 'S') => {
    if (status === 'correct') return;
    setTfAnswers(prev => ({ ...prev, [subId]: val }));
    setStatus('idle');
  };

  const handleVerifyTf = () => {
    if (!question.items) return;
    const allAnswered = question.items.every(it => tfAnswers[it.subId]);
    if (!allAnswered) return;

    let allCorrect = true;
    question.items.forEach(it => {
      if (tfAnswers[it.subId] !== it.answer) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      soundManager.playCorrect();
      soundManager.playBarrierCleared();
      setStatus('correct');
      setScoreAwarded(question.score);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      soundManager.playWrong();
      setStatus('wrong');
    }
  };

  const handlePassThrough = () => {
    onCorrect(obstacleId, scoreAwarded);
  };

  const handleRetry = () => {
    setStatus('idle');
    setSelectedOption(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border-4 border-amber-500/80 rounded-xl pixel-box-shadow shadow-2xl p-4 sm:p-6 text-slate-100 max-h-[92vh] flex flex-col justify-between overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1 bg-amber-500/20 border border-amber-500/50 rounded-lg">
              {question.obstacleIcon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-amber-400">CHƯỚNG NGẠI VẬT #{question.id}</span>
                {question.isStar && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-600 text-purple-100 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> ĐẶC BIỆT
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200">
                {question.obstacleName}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-xs font-pixel text-emerald-400">
              +{question.score} ĐIỂM
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 text-sm font-pixel px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
              title="Đóng / Lùi lại"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Question Content */}
        <div className="flex-1 overflow-y-auto pr-1 my-1 space-y-4 font-sans-vn">
          {/* Question Title */}
          <div className="bg-slate-800/90 border border-slate-700 p-3 sm:p-4 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-teal-400 font-pixel mb-1">
              Câu hỏi vượt ải:
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {question.title}
            </p>
          </div>

          {/* Hint Area */}
          {showHint && (
            <div className="bg-amber-950/40 border border-amber-600/50 p-3 rounded-lg text-amber-200 text-sm flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-300">Gợi ý từ Thần Mê Cung: </strong>
                {question.hint}
              </div>
            </div>
          )}

          {/* MCQ Options */}
          {question.type === 'mcq' && question.options && (
            <div className="grid grid-cols-1 gap-2.5">
              {question.options.map(opt => {
                const isSelected = selectedOption === opt.key;
                const isCorrectOption = opt.key === question.answer;

                let btnStyle = 'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700 text-slate-200';
                if (status === 'correct' && isCorrectOption) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-400';
                } else if (status === 'wrong' && isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-400';
                } else if (isSelected) {
                  btnStyle = 'bg-amber-950/80 border-amber-500 text-amber-200';
                }

                return (
                  <button
                    key={opt.key}
                    disabled={status === 'correct'}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`flex items-start text-left gap-3 p-3 sm:p-3.5 rounded-lg border-2 transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-pixel text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-600 shrink-0">
                      {opt.key}
                    </span>
                    <span className="text-sm sm:text-base leading-snug pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* True / False 4 sub-items */}
          {question.type === 'tf' && question.items && (
            <div className="space-y-2.5">
              <div className="text-xs text-slate-400 font-pixel">
                Chọn Đúng (Đ) hoặc Sai (S) cho từng nhận định bên dưới:
              </div>
              <div className="divide-y divide-slate-800 border border-slate-700 rounded-lg overflow-hidden bg-slate-800/60">
                {question.items.map(item => {
                  const val = tfAnswers[item.subId];
                  return (
                    <div key={item.subId} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/80">
                      <div className="text-sm sm:text-base text-slate-200">
                        <strong className="text-teal-400 mr-1.5">{item.subId})</strong>
                        {item.text}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          disabled={status === 'correct'}
                          onClick={() => handleTfChoice(item.subId, 'Đ')}
                          className={`px-3 py-1.5 rounded font-pixel text-xs transition-all ${
                            val === 'Đ'
                              ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-md'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
                          }`}
                        >
                          ĐÚNG
                        </button>
                        <button
                          type="button"
                          disabled={status === 'correct'}
                          onClick={() => handleTfChoice(item.subId, 'S')}
                          className={`px-3 py-1.5 rounded font-pixel text-xs transition-all ${
                            val === 'S'
                              ? 'bg-rose-600 text-white border-2 border-rose-300 shadow-md'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
                          }`}
                        >
                          SAI
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {status !== 'correct' && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleVerifyTf}
                    disabled={!question.items.every(it => tfAnswers[it.subId])}
                    className="font-pixel text-xs sm:text-sm px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg border border-teal-400"
                  >
                    KIỂM TRA ĐÁP ÁN ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback & Explanation Box */}
          {status === 'correct' && (
            <div className="p-3.5 rounded-lg bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200 text-sm space-y-1.5 animate-bounce-short">
              <div className="flex items-center gap-2 font-bold text-base text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>CHÍNH XÁC! CỔNG ĐÃ ĐƯỢC PHÁ BỎ! (+{scoreAwarded} điểm)</span>
              </div>
              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed pl-7">
                {question.explain}
              </p>
            </div>
          )}

          {status === 'wrong' && (
            <div className="p-3.5 rounded-lg bg-rose-950/70 border-2 border-rose-500 text-rose-200 text-sm space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-base text-rose-300">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>CHƯA CHÍNH XÁC RỒI! HÃY THỬ LẠI!</span>
              </div>
              <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed pl-7">
                Chướng ngại vật vẫn chưa chịu mở. Hãy đọc lại gợi ý hoặc thử lựa chọn khác nhé!
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="border-t-2 border-slate-700 pt-3 mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {!showHint && status !== 'correct' && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-1.5 text-xs font-sans-vn text-amber-400 hover:text-amber-300 bg-amber-950/30 border border-amber-800 px-3 py-1.5 rounded-lg"
              >
                <Lightbulb className="w-4 h-4" /> Xem gợi ý
              </button>
            )}
            {status === 'wrong' && (
              <button
                onClick={handleRetry}
                className="text-xs font-pixel text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-600"
              >
                Thử lại
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {status === 'correct' ? (
              <button
                onClick={handlePassThrough}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-pixel text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-300 shadow-xl animate-pulse"
              >
                <span>VƯỢT QUA & ĐI TIẾP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs font-sans-vn text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded bg-slate-800"
              >
                Lùi lại suy nghĩ thêm
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
