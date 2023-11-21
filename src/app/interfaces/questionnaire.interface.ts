export interface IQuestionnaire {
  questions: IQuestion[];
  answeredQuestions: IQuestion[];
  answers: IAnswer[];
  error: string | null;
}

export interface IQuestion {
  id: string;
  question: string;
  type: number;
  answers: string[];
  creationDate: Date;
}

export interface IAnswer {
  questionId: string;
  answer: string[];
}
