export interface Option {
  text: string;
  isCorrect: boolean;
  isUserCorrect?: boolean;      
  isUserIncorrect?: boolean;     
  isUnselected?: boolean;
}

export interface Question {
    questionText: string;
    options: Option[];
  }
