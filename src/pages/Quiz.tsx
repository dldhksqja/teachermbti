import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Title, 
  ProgressBar, 
  QuestionCard, 
  OptionButton, 
  Button 
} from '../styles/GlobalStyles';
import { questions } from '../data/questions';
import { Answer } from '../types';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (option: 'A' | 'B') => {
    setSelectedOption(option);
  };

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
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // 검사 완료 - 결과 페이지로 이동
      navigate('/result', { state: { answers: newAnswers } });
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
    <Container>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{ color: '#667eea', fontSize: '1.2rem' }}>
            {getCategoryEmoji(currentQuestion.category)} {getCategoryName(currentQuestion.category)}
          </h2>
          <span style={{ color: '#999', fontSize: '1rem' }}>
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '24px', 
              color: '#333',
              lineHeight: '1.6'
            }}>
              💭 {currentQuestion.situation}
            </h3>

            <div style={{ marginBottom: '32px' }}>
              <OptionButton
                selected={selectedOption === 'A'}
                onClick={() => handleOptionSelect('A')}
              >
                <strong>A. </strong>{currentQuestion.optionA.text}
              </OptionButton>

              <OptionButton
                selected={selectedOption === 'B'}
                onClick={() => handleOptionSelect('B')}
              >
                <strong>B. </strong>{currentQuestion.optionB.text}
              </OptionButton>
            </div>

            <div style={{ textAlign: 'center' }}>
              <motion.div
                whileHover={{ scale: selectedOption ? 1.05 : 1 }}
                whileTap={{ scale: selectedOption ? 0.95 : 1 }}
              >
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                  disabled={!selectedOption}
                  style={{ 
                    opacity: selectedOption ? 1 : 0.5,
                    cursor: selectedOption ? 'pointer' : 'not-allowed'
                  }}
                >
                  {currentQuestionIndex === questions.length - 1 ? '🎯 결과 보기' : '➡️ 다음 질문'}
                </Button>
              </motion.div>
            </div>
          </QuestionCard>
        </motion.div>
      </AnimatePresence>

      <div style={{ 
        textAlign: 'center', 
        fontSize: '14px', 
        color: '#999',
        marginTop: '16px'
      }}>
        💡 tip: 직관적으로 떠오르는 답변을 선택해주세요
      </div>
    </Container>
  );
};

export default Quiz;