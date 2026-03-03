import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  RotateCcw, 
  BrainCircuit,
  LayoutDashboard,
  Trophy,
  Settings,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { EXERCISES } from './data';
import { ExerciseType, Question } from './types';
import { explainAnswer, generateMoreExercises } from './services/geminiService';
import { cn } from './lib/utils';
import Markdown from 'react-markdown';

export default function App() {
  const [selectedType, setSelectedType] = useState<ExerciseType | 'All'>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dynamicExercises, setDynamicExercises] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const allExercises = useMemo(() => [...EXERCISES, ...dynamicExercises], [dynamicExercises]);

  const filteredQuestions = useMemo(() => {
    if (selectedType === 'All') return allExercises;
    return allExercises.filter(q => q.type === selectedType);
  }, [selectedType, allExercises]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleLoadMore = async () => {
    setIsGenerating(true);
    const type = selectedType === 'All' ? 'General' : selectedType;
    const newExercises = await generateMoreExercises(type, 10);
    setDynamicExercises(prev => [...prev, ...newExercises]);
    setIsGenerating(false);
  };

  const handleAnswer = (answer: string) => {
    if (userAnswers[currentQuestion.id]) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAiExplanation(null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAiExplanation(null);
    }
  };

  const handleExplain = async () => {
    if (!currentQuestion || isExplaining) return;
    setIsExplaining(true);
    const explanation = await explainAnswer(
      currentQuestion.question,
      userAnswers[currentQuestion.id] || "Chưa trả lời",
      currentQuestion.correctAnswer
    );
    setAiExplanation(explanation || null);
    setIsExplaining(false);
  };

  const score = useMemo(() => {
    return Object.entries(userAnswers).reduce((acc, [id, answer]) => {
      const q = EXERCISES.find(ex => ex.id === id);
      return q?.correctAnswer === answer ? acc + 1 : acc;
    }, 0);
  }, [userAnswers]);

  const progress = (Object.keys(userAnswers).length / EXERCISES.length) * 100;

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-[#E5E7EB] flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600"
            >
              <BookOpen className="w-6 h-6" />
              <span>PrepHub</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <Menu className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <SidebarItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Tất cả bài tập" 
            active={selectedType === 'All'} 
            onClick={() => { setSelectedType('All'); setCurrentQuestionIndex(0); }}
            isOpen={isSidebarOpen}
          />
          <div className="pt-4 pb-2">
            {isSidebarOpen && <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Danh mục</span>}
          </div>
          {Object.values(ExerciseType).map(type => (
            <SidebarItem 
              key={type}
              icon={<Sparkles className="w-5 h-5" />} 
              label={type} 
              active={selectedType === type} 
              onClick={() => { setSelectedType(type); setCurrentQuestionIndex(0); }}
              isOpen={isSidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className={cn("bg-indigo-50 rounded-xl p-4 transition-all", !isSidebarOpen && "p-2")}>
            {isSidebarOpen ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-indigo-900">Tiến độ</span>
                  <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-indigo-600 h-2 rounded-full"
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-[#E5E7EB] flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedType === 'All' ? 'Luyện tập tổng hợp' : selectedType}
            </h2>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500">
              {currentQuestionIndex + 1} / {filteredQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-700">{score} điểm</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
          <div className="w-full max-w-3xl space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl p-10 shadow-sm border border-[#E5E7EB]"
              >
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                    {currentQuestion?.type}
                  </span>
                  <h3 className="text-2xl font-medium leading-relaxed text-gray-900">
                    {currentQuestion?.question}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {currentQuestion?.options ? (
                    currentQuestion.options.map((option, idx) => {
                      const isSelected = userAnswers[currentQuestion.id] === option;
                      const isCorrect = option === currentQuestion.correctAnswer;
                      const showResult = !!userAnswers[currentQuestion.id];

                      return (
                        <button
                          key={idx}
                          disabled={showResult}
                          onClick={() => handleAnswer(option)}
                          className={cn(
                            "group flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left",
                            !showResult && "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50",
                            showResult && isCorrect && "border-emerald-500 bg-emerald-50",
                            showResult && isSelected && !isCorrect && "border-rose-500 bg-rose-50",
                            showResult && !isSelected && !isCorrect && "border-gray-100 opacity-50"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <span className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors",
                              !showResult && "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600",
                              showResult && isCorrect && "bg-emerald-500 text-white",
                              showResult && isSelected && !isCorrect && "bg-rose-500 text-white",
                              showResult && !isSelected && !isCorrect && "bg-gray-100 text-gray-400"
                            )}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-lg font-medium">{option}</span>
                          </div>
                          {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="space-y-4">
                      <input 
                        type="text"
                        placeholder="Nhập câu trả lời của bạn..."
                        className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-indigo-500 focus:ring-0 outline-none text-lg transition-all"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAnswer((e.target as HTMLInputElement).value);
                          }
                        }}
                        disabled={!!userAnswers[currentQuestion.id]}
                      />
                      {userAnswers[currentQuestion.id] && (
                        <div className={cn(
                          "p-5 rounded-2xl border-2",
                          userAnswers[currentQuestion.id].toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-rose-500 bg-rose-50"
                        )}>
                          <p className="text-sm font-bold uppercase tracking-wider mb-1">Đáp án đúng:</p>
                          <p className="text-lg font-medium">{currentQuestion.correctAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {userAnswers[currentQuestion.id] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 pt-8 border-t border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <BrainCircuit className="w-5 h-5" />
                        <span className="font-bold">Giải thích từ AI</span>
                      </div>
                      <button 
                        onClick={handleExplain}
                        disabled={isExplaining}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      >
                        {isExplaining ? (
                          <RotateCcw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        {isExplaining ? 'Đang phân tích...' : 'Yêu cầu giải thích chi tiết'}
                      </button>
                    </div>
                    
                    {aiExplanation ? (
                      <div className="bg-indigo-50/50 rounded-2xl p-6 text-gray-700 prose prose-indigo max-w-none">
                        <Markdown>{aiExplanation}</Markdown>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-2xl p-6 text-gray-500 italic">
                        {currentQuestion.explanation || "Nhấn nút 'Yêu cầu giải thích' để nhận phân tích chi tiết từ AI."}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center px-4">
                <button 
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-indigo-600 font-bold transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  Câu trước
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentQuestionIndex === filteredQuestions.length - 1}
                  className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl hover:border-indigo-500 hover:text-indigo-600 font-bold transition-all shadow-sm disabled:opacity-30"
                >
                  Câu tiếp theo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {currentQuestionIndex === filteredQuestions.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-indigo-600 rounded-3xl p-8 text-white text-center shadow-xl shadow-indigo-200"
                >
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <h4 className="text-xl font-bold mb-2">Bạn đã hoàn thành danh sách này!</h4>
                  <p className="text-indigo-100 mb-6">Nhấn nút bên dưới để AI tạo thêm 10 bài tập mới cho bạn.</p>
                  <button 
                    onClick={handleLoadMore}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                  >
                    {isGenerating ? <RotateCcw className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
                    {isGenerating ? 'Đang tạo bài tập...' : 'Tạo thêm 10 bài tập mới'}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, isOpen }: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  isOpen: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
        active 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
        !isOpen && "justify-center px-0"
      )}
    >
      <span className={cn("transition-transform", active && "scale-110")}>{icon}</span>
      {isOpen && <span className="font-semibold whitespace-nowrap">{label}</span>}
    </button>
  );
}
