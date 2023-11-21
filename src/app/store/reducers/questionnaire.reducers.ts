import { createReducer, on } from '@ngrx/store';

import * as QuestionnaireActions from '../actions/questionnaire.actions';
import {
  IAnswer,
  IQuestion,
  IQuestionnaire,
} from 'src/app/interfaces/questionnaire.interface';

export interface AppState {
  // questionnaireData: IQuestionnaire;
  questions: IQuestion[];
  answeredQuestions: IQuestion[];
  answers: IAnswer[];
  error: string | null;
}

export const initialState: AppState = {
  questions: [],
  answeredQuestions: [],
  answers: [],
  error: null,
};

// export const initialAppState: AppState = {
//   questionnaireData: initialState,
// };

export const questionnaireReducers = createReducer(
  initialState,
  on(QuestionnaireActions.getQuestions, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.questionsLoaded, (state, { questionsResponse }) => {
    const result = {
      ...state,
      questions: questionsResponse,
    };
    return result;
  }),
  on(QuestionnaireActions.questionsLoadError, (state, { error }) => {
    const result = {
      ...state,
      questions: [],
      error: error,
    };
    return result;
  }),
  on(QuestionnaireActions.getAnsweredQuestions, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(
    QuestionnaireActions.answeredQuestionsLoaded,
    (state, { questionsResponse }) => {
      const result = {
        ...state,
        answeredQuestions: questionsResponse,
      };
      return result;
    }
  ),
  on(QuestionnaireActions.answeredQuestionsLoadError, (state, { error }) => {
    const result = {
      ...state,
      questions: [],
      error: error,
    };
    return result;
  }),
  on(QuestionnaireActions.getUnansweredQuestions, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(
    QuestionnaireActions.unansweredQuestionsLoaded,
    (state, { questionsResponse }) => {
      const result = {
        ...state,
        questions: questionsResponse,
      };
      return result;
    }
  ),
  on(QuestionnaireActions.unansweredQuestionsLoadError, (state, { error }) => {
    const result = {
      ...state,
      questions: [],
      error: error,
    };
    return result;
  }),
  on(QuestionnaireActions.getAnswers, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.answersLoaded, (state, { answerResponse }) => {
    const result = {
      ...state,
      answers: answerResponse,
    };
    return result;
  }),
  on(QuestionnaireActions.answersLoadError, (state, { error }) => {
    const result = {
      ...state,
      answers: [],
      error: error,
    };
    return result;
  })
);
