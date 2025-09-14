export interface Question {
  id: number;
  category: 'classroom' | 'management' | 'work' | 'activity';
  situation: string;
  optionA: {
    text: string;
    traits: ('E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P')[];
  };
  optionB: {
    text: string;
    traits: ('E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P')[];
  };
}

export interface Answer {
  questionId: number;
  selectedOption: 'A' | 'B';
  traits: ('E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P')[];
}

export type MBTIType = 
  | 'ENFP' | 'ENFJ' | 'ENTP' | 'ENTJ'
  | 'ESFP' | 'ESFJ' | 'ESTP' | 'ESTJ'
  | 'INFP' | 'INFJ' | 'INTP' | 'INTJ'
  | 'ISFP' | 'ISFJ' | 'ISTP' | 'ISTJ';

export interface MBTIResult {
  type: MBTIType;
  title: string;
  description: string;
  frequentSayings: string[];
  annoying: string[];
  happy: string[];
  teachingStyle: string;
  compatibleTypes: MBTIType[];
  conflictTypes: MBTIType[];
  growthPoints: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Answer[];
  isCompleted: boolean;
  result?: MBTIResult;
}