import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input {
    outline: none;
    border: none;
    font-family: inherit;
  }

  .fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 600px;
  position: relative;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
    }
  ` : `
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.8;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 20px 0;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
  }
`;

export const QuestionCard = styled.div`
  background: #f8f9ff;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }
`;

export const OptionButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 20px;
  margin: 10px 0;
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.selected ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid #667eea;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  ` : `
    background: white;
    color: #333;
    border: 2px solid #e0e0e0;
    
    &:hover {
      border-color: #667eea;
      background: #f8f9ff;
    }
  `}
`;

export const ResultCard = styled.div`
  text-align: center;
  padding: 40px;
  
  .emoji {
    font-size: 4rem;
    margin-bottom: 20px;
  }
  
  .type-title {
    font-size: 2rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.8;
  }
`;

export const ResultSection = styled.div`
  background: #f8f9ff;
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  text-align: left;
  
  h3 {
    color: #667eea;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    &::before {
      content: '✨';
      margin-right: 8px;
    }
  }
`;