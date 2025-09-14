import React from 'react';
import { MBTIResult } from '../types';

interface ResultPageProps {
  result: MBTIResult;
  onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onRestart }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '교실 속 나의 MBTI',
        text: `나는 ${result.title}! ${result.description}`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('링크가 복사되었습니다!');
    }
  };

  const getTypeEmoji = (type: string) => {
    const emojis: { [key: string]: string } = {
      'ENFP': '🌟', 'ENFJ': '💝', 'ENTP': '🗣️', 'ENTJ': '👑',
      'ESFP': '🎉', 'ESFJ': '🤱', 'ESTP': '⚡', 'ESTJ': '📋',
      'INFP': '🌸', 'INFJ': '🔮', 'INTP': '🔬', 'INTJ': '♟️',
      'ISFP': '🎨', 'ISFJ': '🛡️', 'ISTP': '🔧', 'ISTJ': '📚'
    };
    return emojis[type] || '👨‍🏫';
  };

  const resultSectionStyle = {
    background: '#f8f9ff',
    borderRadius: '12px',
    padding: '24px',
    margin: '20px 0',
    textAlign: 'left' as const
  };

  return (
    <div className="container">
      {/* 메인 결과 */}
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
          {getTypeEmoji(result.type)}
        </div>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {result.title}
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          marginBottom: '30px',
          lineHeight: '1.8'
        }}>
          {result.description}
        </p>
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
      </div>

      {/* 교실에서 자주 하는 말 */}
      <div style={resultSectionStyle}>
        <h3 style={{ color: '#667eea', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📢 교실에서 자주 하는 말 TOP 5
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {result.frequentSayings.map((saying, index) => (
            <li key={index} style={{ 
              padding: '8px 0', 
              borderBottom: '1px solid #eee',
              position: 'relative',
              paddingLeft: '24px'
            }}>
              <span style={{ position: 'absolute', left: 0 }}>✨</span>
              "{saying}"
            </li>
          ))}
        </ul>
      </div>

      {/* 열받는 상황 */}
      <div style={resultSectionStyle}>
        <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
          😤 이런 상황에 열받아요
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {result.annoying.map((item, index) => (
            <li key={index} style={{ 
              padding: '8px 0', 
              borderBottom: '1px solid #eee',
              position: 'relative',
              paddingLeft: '24px'
            }}>
              <span style={{ position: 'absolute', left: 0 }}>😠</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 기분 좋은 순간 */}
      <div style={resultSectionStyle}>
        <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
          😊 이런 순간에 기분 최고!
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {result.happy.map((item, index) => (
            <li key={index} style={{ 
              padding: '8px 0', 
              borderBottom: '1px solid #eee',
              position: 'relative',
              paddingLeft: '24px'
            }}>
              <span style={{ position: 'absolute', left: 0 }}>😊</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 교실 운영 스타일 */}
      <div style={resultSectionStyle}>
        <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
          💡 나만의 교실 운영 스타일
        </h3>
        <p style={{ padding: '16px', background: '#fff', borderRadius: '8px', lineHeight: '1.8' }}>
          {result.teachingStyle}
        </p>
      </div>

      {/* 동료 관계 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={resultSectionStyle}>
          <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
            🤝 잘 맞는 동료
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.compatibleTypes.map((type, index) => (
              <li key={index} style={{ 
                padding: '8px 0',
                position: 'relative',
                paddingLeft: '24px'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>💚</span>
                {type} {getTypeEmoji(type)}
              </li>
            ))}
          </ul>
        </div>

        <div style={resultSectionStyle}>
          <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
            🔥 부딪힐 수 있는 동료
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.conflictTypes.map((type, index) => (
              <li key={index} style={{ 
                padding: '8px 0',
                position: 'relative',
                paddingLeft: '24px'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>⚠️</span>
                {type} {getTypeEmoji(type)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 성장 포인트 */}
      <div style={resultSectionStyle}>
        <h3 style={{ color: '#667eea', marginBottom: '16px' }}>
          📈 성장 포인트
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {result.growthPoints.map((point, index) => (
            <li key={index} style={{ 
              padding: '8px 0', 
              borderBottom: '1px solid #eee',
              position: 'relative',
              paddingLeft: '24px'
            }}>
              <span style={{ position: 'absolute', left: 0 }}>🌱</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 버튼들 */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        justifyContent: 'center',
        marginTop: '32px',
        flexWrap: 'wrap' as const
      }}>
        <button 
          onClick={handleShare}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          📤 결과 공유하기
        </button>
        
        <button 
          onClick={onRestart}
          style={{
            background: 'white',
            color: '#667eea',
            border: '2px solid #667eea',
            padding: '16px 32px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🔄 다시 검사하기
        </button>
      </div>

      {/* 마무리 메시지 */}
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
    </div>
  );
};

export default ResultPage;