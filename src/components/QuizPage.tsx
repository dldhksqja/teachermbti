import { useState } from 'react';
import { questions } from '../data/questions';
import type { Answer } from '../types';
import { calculateMBTI } from '../utils/mbtiCalculator';
import { mbtiResults } from '../data/results';

interface QuizPageProps {
  onComplete: (result: any) => void;
}

const QuizPage = ({ onComplete }: QuizPageProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!selectedOption) return;

    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption,
      traits: selectedOption === 'A' 
        ? currentQuestion.optionA.traits 
        : currentQuestion.optionB.traits
    };

    const newAnswers = [...answers, answer];

    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // 검사 완료
      const mbtiType = calculateMBTI(newAnswers);
      const result = mbtiResults[mbtiType];
      onComplete(result);
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'classroom': return '🏫';
      case 'management': return '👥';
      case 'work': return '📊';
      case 'activity': return '🎉';
      default: return '📝';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'classroom': return '수업 상황';
      case 'management': return '학급 관리';
      case 'work': return '업무 처리';
      case 'activity': return '특별 활동';
      default: return '기타';
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{ color: '#667eea', fontSize: '1.2rem', margin: 0 }}>
            {getCategoryEmoji(currentQuestion.category)} {getCategoryName(currentQuestion.category)}
          </h2>
          <span style={{ color: '#999', fontSize: '1rem' }}>
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: '#f0f0f0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.5s ease'
          }}></div>
        </div>
      </div>

      <div style={{
        background: '#f8f9ff',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        textAlign: 'left'
      }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '24px', 
          color: '#333',
          lineHeight: '1.6'
        }}>
          💭 {currentQuestion.situation}
        </h3>

        <div style={{ marginBottom: '32px' }}>
          <button
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '20px',
              margin: '10px 0',
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '1.5',
              cursor: 'pointer',
              border: `2px solid ${selectedOption === 'A' ? '#667eea' : '#e0e0e0'}`,
              background: selectedOption === 'A' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'white',
              color: selectedOption === 'A' ? 'white' : '#333',
              transition: 'all 0.3s ease',
              boxShadow: selectedOption === 'A' ? '0 8px 20px rgba(102, 126, 234, 0.3)' : 'none'
            }}
            onClick={() => setSelectedOption('A')}
            onMouseEnter={(e) => {
              if (selectedOption !== 'A') {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = '#f8f9ff';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== 'A') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.background = 'white';
              }
            }}
          >
            <strong>A. </strong>{currentQuestion.optionA.text}
          </button>

          <button
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '20px',
              margin: '10px 0',
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '1.5',
              cursor: 'pointer',
              border: `2px solid ${selectedOption === 'B' ? '#667eea' : '#e0e0e0'}`,
              background: selectedOption === 'B' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'white',
              color: selectedOption === 'B' ? 'white' : '#333',
              transition: 'all 0.3s ease',
              boxShadow: selectedOption === 'B' ? '0 8px 20px rgba(102, 126, 234, 0.3)' : 'none'
            }}
            onClick={() => setSelectedOption('B')}
            onMouseEnter={(e) => {
              if (selectedOption !== 'B') {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = '#f8f9ff';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== 'B') {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.background = 'white';
              }
            }}
          >
            <strong>B. </strong>{currentQuestion.optionB.text}
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleNext}
            disabled={!selectedOption}
            style={{ 
              opacity: selectedOption ? 1 : 0.5,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            {currentQuestionIndex === questions.length - 1 ? '🎯 결과 보기' : '➡️ 다음 질문'}
          </button>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        fontSize: '14px', 
        color: '#999'
      }}>
        💡 tip: 직관적으로 떠오르는 답변을 선택해주세요
      </div>
    </div>
  );
};

export default QuizPage;