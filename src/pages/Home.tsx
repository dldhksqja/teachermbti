import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Subtitle, Button } from '../styles/GlobalStyles';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🍎📚</div>
        
        <Title>교실 속 나의 MBTI</Title>
        
        <Subtitle>
          교사인 당신, 교실에서는 어떤 모습인가요?<br />
          실제 교육 현장의 상황들을 통해 알아보는<br />
          <strong>나만의 교사 성격유형</strong>
        </Subtitle>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
            borderRadius: '16px',
            padding: '24px',
            margin: '32px 0',
            border: '2px solid #667eea'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
              📝 이런 걸 알려드려요!
            </h3>
            <ul style={{ textAlign: 'left', color: '#666', lineHeight: '1.8' }}>
              <li>✨ 교실에서 자주 하는 말 TOP 5</li>
              <li>😤 이런 상황에 열받아요</li>
              <li>😊 이런 순간에 기분 최고!</li>
              <li>💡 나만의 교실 운영 스타일</li>
              <li>🤝 잘 맞는 동료 vs 부딪힐 수 있는 동료</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="primary" onClick={handleStart}>
            🚀 검사 시작하기
          </Button>
        </motion.div>

        <p style={{ 
          marginTop: '24px', 
          fontSize: '14px', 
          color: '#999',
          lineHeight: '1.6'
        }}>
          ⏰ 소요시간: 약 5분 | 📊 총 16문항<br />
          💡 솔직하게 답변할수록 정확한 결과를 얻을 수 있어요
        </p>
      </motion.div>
    </Container>
  );
};

export default Home;