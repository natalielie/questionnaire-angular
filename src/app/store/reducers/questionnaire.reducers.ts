import { createReducer, on } from '@ngrx/store';

import * as SurveyActions from '../actions/questionnaire.actions';
import {
  IAnswer,
  IQuestion,
  ISurvey,
} from 'src/app/interfaces/questionnaire.interface';

export interface AppState {
  // surveyData: ISurvey;
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
//   surveyData: initialState,
// };

export const surveyReducers = createReducer(
  initialState,
  on(SurveyActions.getQuestions, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(SurveyActions.questionsLoaded, (state, { questionsResponse }) => {
    const result = {
      ...state,
      questions: questionsResponse,
    };
    return result;
  }),
  on(SurveyActions.questionsLoadError, (state, { error }) => {
    const result = {
      ...state,
      questions: [],
      error: error,
    };
    return result;
  }),
  on(SurveyActions.getAnsweredQuestions, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(SurveyActions.answeredQuestionsLoaded, (state, { questionsResponse }) => {
    const result = {
      ...state,
      answeredQuestions: questionsResponse,
    };
    return result;
  }),
  on(SurveyActions.answeredQuestionsLoadError, (state, { error }) => {
    const result = {
      ...state,
      questions: [],
      error: error,
    };
    return result;
  }),
  on(SurveyActions.getUnansweredQuestions, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(
    SurveyActions.unansweredQuestionsLoaded,
    (state, { questionsResponse }) => {
      const result = {
        ...state,
        questions: questionsResponse,
      };
      return result;
    }
  ),
  on(SurveyActions.unansweredQuestionsLoadError, (state, { error }) => {
    const result = {
      ...state,
      questions: [],
      error: error,
    };
    return result;
  }),
  on(SurveyActions.getAnswers, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(SurveyActions.answersLoaded, (state, { answerResponse }) => {
    const result = {
      ...state,
      answers: answerResponse,
    };
    return result;
  }),
  on(SurveyActions.answersLoadError, (state, { error }) => {
    const result = {
      ...state,
      answers: [],
      error: error,
    };
    return result;
  })
);
