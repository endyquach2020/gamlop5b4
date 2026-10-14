import React, { useState } from 'react';
import { QUESTIONS_DATA, Question } from '../data/questions';
import { BookOpen, CheckCircle, Search, X, Sparkles } from 'lucide-react';

interface StudyHandbookModalProps {
  onClose: () => void;
}

export const StudyHandbookModal: React.FC<StudyHandbookModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'c1' | 'c2' | 'c3' | 'c4'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterQuestions = (): Question[] => {
    return QUESTIONS_DATA.filter(q => {
      // Tab filter
      let matchTab = true;
      if (activeTab === 'c1') matchTab = q.id >= 1 && q.id <= 7;
      if (activeTab === 'c2') matchTab = q.id >= 8 && q.id <= 14;
      if (activeTab === 'c3') matchTab = q.id >= 15 && q.id <= 21;
      if (activeTab === 'c4') matchTab = q.id >= 22 && q.id <= 28;

      // Search filter
      const matchSearch = searchTerm.trim() === '' || 
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.explain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.obstacleName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchTab && matchSearch;
    });
  };

  const filtered = filterQuestions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-4 border-indigo-500/80 rounded-2xl pixel-box-shadow shadow-2xl p-4 sm:p-6 text-slate-100 max-h-[92vh] flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="font-pixel text-[10px] text-indigo-400 uppercase tracking-widest">
                SỔ TAY BÍ KÍP MÊ CUNG
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans-vn">
                Bài 4: Tìm Kiếm Thông Tin Trên Internet (28 Câu Hỏi & Đáp Án)
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

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-pixel">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white border border-indigo-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              TẤT CẢ (28)
            </button>
            <button
              onClick={() => setActiveTab('c1')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                activeTab === 'c1'
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              CẤP 1 (1-7)
            </button>
            <button
              onClick={() => setActiveTab('c2')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                activeTab === 'c2'
                  ? 'bg-amber-600 text-white border border-amber-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              CẤP 2 (8-14)
            </button>
            <button
              onClick={() => setActiveTab('c3')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                activeTab === 'c3'
                  ? 'bg-rose-600 text-white border border-rose-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              CẤP 3 (15-21)
            </button>
            <button
              onClick={() => setActiveTab('c4')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                activeTab === 'c4'
                  ? 'bg-purple-600 text-white border border-purple-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              CẤP 4 (22-28)
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo từ khoá câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-60 bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Question Cards List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 font-sans-vn">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              Không tìm thấy câu hỏi phù hợp với từ khoá.
            </div>
          ) : (
            filtered.map((q) => (
              <div
                key={q.id}
                className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 sm:p-4 hover:border-slate-600 transition"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{q.obstacleIcon}</span>
                    <span className="font-pixel text-xs text-amber-400">
                      CÂU {q.id} {q.isStar ? '★' : ''}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ({q.obstacleName})
                    </span>
                  </div>
                  <span className="text-[11px] font-pixel text-emerald-400 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
                    +{q.score} điểm
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-white mb-2 leading-snug">
                  {q.title}
                </p>

                {/* Options / Items */}
                {q.type === 'mcq' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs sm:text-sm">
                    {q.options.map((opt) => {
                      const isCorrect = opt.key === q.answer;
                      return (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                            isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-pixel shrink-0 ${
                              isCorrect ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === 'tf' && q.items && (
                  <div className="space-y-1.5 my-2 text-xs sm:text-sm">
                    {q.items.map((it) => (
                      <div
                        key={it.subId}
                        className="p-2 bg-slate-900/60 border border-slate-700 rounded-lg flex items-center justify-between gap-2"
                      >
                        <span className="text-slate-200">
                          <strong className="text-teal-400 mr-1">{it.subId})</strong>
                          {it.text}
                        </span>
                        <span
                          className={`font-pixel text-[10px] px-2 py-0.5 rounded shrink-0 font-bold ${
                            it.answer === 'Đ'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {it.answer === 'Đ' ? 'ĐÚNG' : 'SAI'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Explanation */}
                <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-xs text-amber-200/90 flex items-start gap-1.5 bg-amber-950/20 p-2 rounded">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Giải thích: </strong>
                    {q.explain}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-slate-700 pt-3 mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Hiển thị {filtered.length} / 28 câu hỏi sách Tin học 5 - Bài 4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-pixel text-xs text-white shadow"
          >
            ĐÓNG SỔ TAY
          </button>
        </div>

      </div>
    </div>
  );
};
