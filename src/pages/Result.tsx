import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Container, 
  Button, 
  ResultCard, 
  ResultSection 
} from '../styles/GlobalStyles';
import { Answer, MBTIResult } from '../types';
import { calculateMBTI } from '../utils/mbtiCalculator';
import { mbtiResults } from '../data/results';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<MBTIResult | null>(null);
  
  useEffect(() => {
    const answers = location.state?.answers as Answer[];
    if (!answers) {
      navigate('/');
      return;
    }

    const mbtiType = calculateMBTI(answers);
    setResult(mbtiResults[mbtiType]);
  }, [location, navigate]);

  const handleRestart = () => {
    navigate('/');
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: '교실 속 나의 MBTI',
        text: `나는 ${result.title}! ${result.description}`,
        url: window.location.origin
      });
    } else {
      // 링크 복사 기능
      navigator.clipboard.writeText(window.location.origin);
      alert('링크가 복사되었습니다!');
    }
  };

  if (!result) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <p>결과를 분석 중입니다...</p>
        </div>
      </Container>
    );
  }

  const getTypeEmoji = (type: string) => {
    const emojis: { [key: string]: string } = {
      'ENFP': '🌟', 'ENFJ': '💝', 'ENTP': '🗣️', 'ENTJ': '👑',
      'ESFP': '🎉', 'ESFJ': '🤱', 'ESTP': '⚡', 'ESTJ': '📋',
      'INFP': '🌸', 'INFJ': '🔮', 'INTP': '🔬', 'INTJ': '♟️',
      'ISFP': '🎨', 'ISFJ': '🛡️', 'ISTP': '🔧', 'ISTJ': '📚'
    };
    return emojis[type] || '👨‍🏫';
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ResultCard>
          <div className="emoji">{getTypeEmoji(result.type)}</div>
          <h1 className="type-title">{result.title}</h1>
          <p className="description">{result.description}</p>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '20px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '32px'
          }}>
            {result.type}
          </div>
        </ResultCard>

        <ResultSection>
          <h3>📢 교실에서 자주 하는 말 TOP 5</h3>
          <ul>
            {result.frequentSayings.map((saying, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                "{saying}"
              </motion.li>
            ))}
          </ul>
        </ResultSection>

        <ResultSection>
          <h3>😤 이런 상황에 열받아요</h3>
          <ul>
            {result.annoying.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                style={{ '::before': { content: '"😠"' } } as any}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </ResultSection>

        <ResultSection>
          <h3>😊 이런 순간에 기분 최고!</h3>
          <ul>
            {result.happy.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 1 }}
                style={{ '::before': { content: '"😊"' } } as any}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </ResultSection>

        <ResultSection>
          <h3>💡 나만의 교실 운영 스타일</h3>
          <p style={{ padding: '16px', background: '#fff', borderRadius: '8px', lineHeight: '1.8' }}>
            {result.teachingStyle}
          </p>
        </ResultSection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <ResultSection>
            <h3>🤝 잘 맞는 동료</h3>
            <ul>
              {result.compatibleTypes.map((type, index) => (
                <li key={index} style={{ '::before': { content: '"💚"' } } as any}>
                  {type} {getTypeEmoji(type)}
                </li>
              ))}
            </ul>
          </ResultSection>

          <ResultSection>
            <h3>🔥 부딪힐 수 있는 동료</h3>
            <ul>
              {result.conflictTypes.map((type, index) => (
                <li key={index} style={{ '::before': { content: '"⚠️"' } } as any}>
                  {type} {getTypeEmoji(type)}
                </li>
              ))}
            </ul>
          </ResultSection>
        </div>

        <ResultSection>
          <h3>📈 성장 포인트</h3>
          <ul>
            {result.growthPoints.map((point, index) => (
              <li key={index} style={{ '::before': { content: '"🌱"' } } as any}>
                {point}
              </li>
            ))}
          </ul>
        </ResultSection>

        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center',
          marginTop: '32px',
          flexWrap: 'wrap'
        }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" onClick={handleShare}>
              📤 결과 공유하기
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="secondary" onClick={handleRestart}>
              🔄 다시 검사하기
            </Button>
          </motion.div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '24px',
          background: '#f8f9ff',
          borderRadius: '12px',
          border: '2px solid #667eea'
        }}>
          <p style={{ color: '#667eea', fontWeight: '600', marginBottom: '8px' }}>
            🎯 이 결과가 마음에 드시나요?
          </p>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
            친구들과 동료 선생님들에게도 공유해보세요!<br />
            우리 학교 선생님들의 MBTI를 모아보는 재미도 쏠쏠할 거예요 😊
          </p>
        </div>
      </motion.div>
    </Container>
  );
};

export default Result;