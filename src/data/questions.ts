import { Question } from '../types';

export const questions: Question[] = [
  // 수업 상황 (4문항)
  {
    id: 1,
    category: 'classroom',
    situation: '수업 중 학생들이 계속 떠들어서 집중이 안 될 때',
    optionA: {
      text: '"여러분! 조용히 해주세요. 지금 중요한 내용이에요!" (목소리를 높여서)',
      traits: ['E', 'J']
    },
    optionB: {
      text: '조용히 다가가서 개별적으로 주의를 준다',
      traits: ['I', 'F']
    }
  },
  {
    id: 2,
    category: 'classroom',
    situation: '갑자기 수업 계획이 틀어져서 즉흥적으로 수업을 해야 할 때',
    optionA: {
      text: '미리 준비해둔 예비 계획으로 차근차근 진행한다',
      traits: ['J', 'S']
    },
    optionB: {
      text: '그 순간의 영감으로 창의적인 수업을 만들어낸다',
      traits: ['P', 'N']
    }
  },
  {
    id: 3,
    category: 'classroom',
    situation: '어려운 개념을 설명할 때',
    optionA: {
      text: '단계별로 논리적 순서에 따라 체계적으로 설명한다',
      traits: ['T', 'J']
    },
    optionB: {
      text: '학생들의 감정과 흥미를 고려해서 재미있는 이야기로 설명한다',
      traits: ['F', 'N']
    }
  },
  {
    id: 4,
    category: 'classroom',
    situation: '수업 중 질문이 많이 들어올 때',
    optionA: {
      text: '즉석에서 바로바로 답변해준다',
      traits: ['E', 'P']
    },
    optionB: {
      text: '잠시 생각할 시간을 달라고 하고 정확한 답변을 준비한다',
      traits: ['I', 'J']
    }
  },

  // 학급 관리 (4문항)
  {
    id: 5,
    category: 'management',
    situation: '새 학기 첫날 학급 운영 규칙을 정할 때',
    optionA: {
      text: '미리 완벽하게 준비한 규칙집을 나눠주고 설명한다',
      traits: ['J', 'T']
    },
    optionB: {
      text: '학생들과 함께 토론하며 규칙을 만들어간다',
      traits: ['P', 'F']
    }
  },
  {
    id: 6,
    category: 'management',
    situation: '학생 간 갈등이 발생했을 때',
    optionA: {
      text: '사실 관계를 명확히 파악하고 공정한 해결책을 제시한다',
      traits: ['T', 'S']
    },
    optionB: {
      text: '각자의 마음을 충분히 들어보고 화해할 수 있도록 돕는다',
      traits: ['F', 'N']
    }
  },
  {
    id: 7,
    category: 'management',
    situation: '학부모 상담을 준비할 때',
    optionA: {
      text: '학생의 모든 기록을 꼼꼼히 정리해서 체계적으로 준비한다',
      traits: ['S', 'J']
    },
    optionB: {
      text: '큰 틀에서 학생의 장점과 가능성을 중심으로 준비한다',
      traits: ['N', 'P']
    }
  },
  {
    id: 8,
    category: 'management',
    situation: '문제 학생을 지도할 때',
    optionA: {
      text: '규칙과 원칙을 명확히 제시하고 일관되게 적용한다',
      traits: ['T', 'J']
    },
    optionB: {
      text: '학생의 상황을 이해하려 노력하고 개별적으로 접근한다',
      traits: ['F', 'P']
    }
  },

  // 업무 처리 (4문항)
  {
    id: 9,
    category: 'work',
    situation: '갑작스런 공문이나 업무가 들어왔을 때',
    optionA: {
      text: '다른 일을 멈추고 즉시 처리한다',
      traits: ['E', 'J']
    },
    optionB: {
      text: '기존 계획을 고려해서 우선순위를 정해 처리한다',
      traits: ['I', 'P']
    }
  },
  {
    id: 10,
    category: 'work',
    situation: '성적 처리나 평가 업무를 할 때',
    optionA: {
      text: '정확한 데이터와 객관적 기준으로 평가한다',
      traits: ['T', 'S']
    },
    optionB: {
      text: '학생 개인의 성장과 노력 과정을 종합적으로 평가한다',
      traits: ['F', 'N']
    }
  },
  {
    id: 11,
    category: 'work',
    situation: '동료 교사와 협업할 때',
    optionA: {
      text: '활발하게 의견을 나누며 함께 아이디어를 발전시킨다',
      traits: ['E', 'N']
    },
    optionB: {
      text: '각자 맡은 부분을 명확히 하고 체계적으로 진행한다',
      traits: ['I', 'S']
    }
  },
  {
    id: 12,
    category: 'work',
    situation: '회의에서 의견을 말할 때',
    optionA: {
      text: '생각나는 대로 바로바로 의견을 제시한다',
      traits: ['E', 'P']
    },
    optionB: {
      text: '충분히 생각한 후 정리된 의견을 발표한다',
      traits: ['I', 'J']
    }
  },

  // 특별 활동 (4문항)
  {
    id: 13,
    category: 'activity',
    situation: '체험학습을 계획할 때',
    optionA: {
      text: '세세한 일정과 안전 계획을 완벽하게 준비한다',
      traits: ['S', 'J']
    },
    optionB: {
      text: '큰 틀만 정하고 현장에서 유연하게 진행한다',
      traits: ['N', 'P']
    }
  },
  {
    id: 14,
    category: 'activity',
    situation: '학예회 준비를 할 때',
    optionA: {
      text: '학생들 모두가 참여할 수 있는 포용적인 프로그램을 만든다',
      traits: ['F', 'E']
    },
    optionB: {
      text: '효율적이고 완성도 높은 프로그램을 만든다',
      traits: ['T', 'I']
    }
  },
  {
    id: 15,
    category: 'activity',
    situation: '방과후 활동을 운영할 때',
    optionA: {
      text: '정해진 커리큘럼에 따라 꾸준히 진행한다',
      traits: ['S', 'J']
    },
    optionB: {
      text: '학생들의 관심사에 따라 다양하게 변화시킨다',
      traits: ['N', 'P']
    }
  },
  {
    id: 16,
    category: 'activity',
    situation: '학급 행사를 준비할 때',
    optionA: {
      text: '학생들과 함께 아이디어를 모으고 토론하며 결정한다',
      traits: ['E', 'F']
    },
    optionB: {
      text: '혼자서 충분히 계획을 세운 후 학생들에게 제시한다',
      traits: ['I', 'T']
    }
  }
];