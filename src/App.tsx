import React, { useState } from 'react';
import './App.css';

// 타입 정의
interface Question {
  id: number;
  category: string;
  situation: string;
  optionA: { text: string; traits: string[] };
  optionB: { text: string; traits: string[] };
}

interface Answer {
  questionId: number;
  selectedOption: 'A' | 'B';
  traits: string[];
}

interface MBTIResult {
  type: string;
  title: string;
  description: string;
  frequentSayings: string[];
  annoying: string[];
  happy: string[];
  teachingStyle: string;
  compatibleTypes: string[];
  conflictTypes: string[];
  growthPoints: string[];
}

type AppState = 'home' | 'quiz' | 'result';

// 질문 데이터
const questions: Question[] = [
  {
    id: 1,
    category: 'classroom',
    situation: '수업 중 학생들이 계속 떠들어서 집중이 안 될 때',
    optionA: { text: '"여러분! 조용히 해주세요. 지금 중요한 내용이에요!" (목소리를 높여서)', traits: ['E', 'J'] },
    optionB: { text: '조용히 다가가서 개별적으로 주의를 준다', traits: ['I', 'F'] }
  },
  {
    id: 2,
    category: 'classroom',
    situation: '갑자기 수업 계획이 틀어져서 즉흥적으로 수업을 해야 할 때',
    optionA: { text: '미리 준비해둔 예비 계획으로 차근차근 진행한다', traits: ['J', 'S'] },
    optionB: { text: '그 순간의 영감으로 창의적인 수업을 만들어낸다', traits: ['P', 'N'] }
  },
  {
    id: 3,
    category: 'management',
    situation: '학생 간 갈등이 발생했을 때',
    optionA: { text: '사실 관계를 명확히 파악하고 공정한 해결책을 제시한다', traits: ['T', 'S'] },
    optionB: { text: '각자의 마음을 충분히 들어보고 화해할 수 있도록 돕는다', traits: ['F', 'N'] }
  },
  {
    id: 4,
    category: 'work',
    situation: '성적 처리나 평가 업무를 할 때',
    optionA: { text: '정확한 데이터와 객관적 기준으로 평가한다', traits: ['T', 'S'] },
    optionB: { text: '학생 개인의 성장과 노력 과정을 종합적으로 평가한다', traits: ['F', 'N'] }
  }
];

// MBTI 계산 함수
function calculateMBTI(answers: Answer[]): string {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach(answer => {
    answer.traits.forEach(trait => {
      if (trait in scores) {
        (scores as any)[trait]++;
      }
    });
  });

  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return type;
}

// 결과 데이터 (간소화 버전)
const getResult = (type: string): MBTIResult => {
  const results: { [key: string]: MBTIResult } = {
    'ENFP': {
      type: 'ENFP',
      title: '열정적인 영감 선생님 🌟',
      description: '학생들에게 꿈과 희망을 심어주는 에너지 넘치는 교사',
      frequentSayings: ['오늘 뭔가 재미있는 걸 해볼까?', '여러분의 가능성은 무한해요!', '실수해도 괜찮아, 다시 해보자!'],
      annoying: ['똑같은 루틴의 반복', '창의성을 억누르는 규칙들', '열정 없는 학생들'],
      happy: ['학생이 "선생님 수업이 제일 재미있어요!" 할 때', '새로운 교육 방법을 시도해볼 때', '학생들이 활발하게 토론할 때'],
      teachingStyle: '학생 중심의 창의적이고 역동적인 수업을 추구하며, 항상 새로운 시도를 통해 학생들의 잠재력을 끌어내려 노력합니다.',
      compatibleTypes: ['INFJ', 'INTJ', 'ENFJ'],
      conflictTypes: ['ISTJ', 'ESTJ'],
      growthPoints: ['체계적인 계획 수립 능력', '일관성 있는 학급 관리', '세부사항에 대한 꼼꼼함']
    },
    'DEFAULT': {
      type: type,
      title: `${type} 선생님 🎯`,
      description: '당신만의 독특한 교육 스타일을 가진 멋진 교사입니다!',
      frequentSayings: ['함께 해보자!', '잘하고 있어!', '포기하지 마!'],
      annoying: ['무관심한 학생들', '비협조적인 상황', '시간 부족'],
      happy: ['학생들의 성장을 볼 때', '수업이 잘 진행될 때', '목표를 달성할 때'],
      teachingStyle: '학생들을 위해 최선을 다하는 헌신적인 교육자입니다.',
      compatibleTypes: ['ENFJ', 'INFJ'],
      conflictTypes: ['ESTP', 'ISTP'],
      growthPoints: ['지속적인 자기개발', '학생과의 소통', '교육 방법 개선']
    }
  };
  
  return results[type] || results['DEFAULT'];
};

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const handleStartQuiz = () => {
    setCurrentState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption,
      traits: selectedOption === 'A' ? currentQuestion.optionA.traits : currentQuestion.optionB.traits
    };

    const newAnswers = [...answers, answer];

    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      const mbtiType = calculateMBTI(newAnswers);
      const mbtiResult = getResult(mbtiType);
      setResult(mbtiResult);
      setCurrentState('result');
    }
  };

  const handleRestart = () => {
    setResult(null);
    setCurrentState('home');
  };

  return (
    <div className="app">
      {/* 홈 페이지 */}
      {currentState === 'home' && (
        <div className="container">
          <div className="home-content">
            <div className="emoji">🍎📚</div>
            <h1 className="title">교실 속 나의 MBTI</h1>
            <p className="subtitle">
              교사인 당신, 교실에서는 어떤 모습인가요?<br />
              실제 교육 현장의 상황들을 통해 알아보는<br />
              <strong>나만의 교사 성격유형</strong>
            </p>
            
            <div className="info-box">
              <h3>📝 이런 걸 알려드려요!</h3>
              <ul>
                <li>✨ 교실에서 자주 하는 말 TOP 3</li>
                <li>😤 이런 상황에 열받아요</li>
                <li>😊 이런 순간에 기분 최고!</li>
                <li>💡 나만의 교실 운영 스타일</li>
              </ul>
            </div>

            <button className="start-button" onClick={handleStartQuiz}>
              🚀 검사 시작하기
            </button>

            <p className="info-text">
              ⏰ 소요시간: 약 2분 | 📊 총 4문항<br />
              💡 솔직하게 답변할수록 정확한 결과를 얻을 수 있어요
            </p>
          </div>
        </div>
      )}

      {/* 퀴즈 페이지 */}
      {currentState === 'quiz' && (
        <div className="container">
          <div className="quiz-header">
            <h2>{currentQuestionIndex + 1} / {questions.length}</h2>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-card">
            <h3>💭 {questions[currentQuestionIndex].situation}</h3>
            
            <div className="options">
              <button 
                className={`option ${selectedOption === 'A' ? 'selected' : ''}`}
                onClick={() => setSelectedOption('A')}
              >
                <strong>A. </strong>{questions[currentQuestionIndex].optionA.text}
              </button>
              
              <button 
                className={`option ${selectedOption === 'B' ? 'selected' : ''}`}
                onClick={() => setSelectedOption('B')}
              >
                <strong>B. </strong>{questions[currentQuestionIndex].optionB.text}
              </button>
            </div>

            <button 
              className="next-button" 
              onClick={handleNext}
              disabled={!selectedOption}
            >
              {currentQuestionIndex === questions.length - 1 ? '🎯 결과 보기' : '➡️ 다음 질문'}
            </button>
          </div>
        </div>
      )}

      {/* 결과 페이지 */}
      {currentState === 'result' && result && (
        <div className="container">
          <div className="result-header">
            <div className="result-emoji">🎯</div>
            <h1>{result.title}</h1>
            <p className="result-description">{result.description}</p>
            <div className="result-type">{result.type}</div>
          </div>

          <div className="result-section">
            <h3>📢 교실에서 자주 하는 말</h3>
            <ul>
              {result.frequentSayings.map((saying, index) => (
                <li key={index}>"{saying}"</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h3>😤 이런 상황에 열받아요</h3>
            <ul>
              {result.annoying.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h3>😊 이런 순간에 기분 최고!</h3>
            <ul>
              {result.happy.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h3>💡 나만의 교실 운영 스타일</h3>
            <p>{result.teachingStyle}</p>
          </div>

          <div className="result-buttons">
            <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
              📤 결과 공유하기
            </button>
            <button onClick={handleRestart}>
              🔄 다시 검사하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;