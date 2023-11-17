import { createReducer, on } from '@ngrx/store';

import * as SurveyActions from '../actions/survey.actions';
import {
  IAnswer,
  IQuestion,
  ISurvey,
} from 'src/app/interfaces/survey.interface';

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
      questions: questionsResponse,
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
  })
);
