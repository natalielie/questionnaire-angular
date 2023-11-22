export interface IQuestionnaire {
  questions: IQuestion[];
  answeredQuestions: IQuestion[];
  answers: IAnswer[];
  error: string | null;
}

export interface IQuestion {
  id: string;
  question: string;
  type: string;
  answers: string[];
  creationDate: Date;
  answerDate: Date | null;
}

export interface IAnswer {
  questionId: string;
  answer: string[];
}
