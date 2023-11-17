import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/survey.reducers';

export const surveyFeature = createFeatureSelector<AppState>('surveyData');

export const selectSurveyData = createSelector(surveyFeature, (state) => state);

export const selectAllQuestions = createSelector(
  surveyFeature,
  (state) => state.questions
);

export const selectUnansweredQuestions = createSelector(
  surveyFeature,
  (state) => state.questions
);

export const selectAnsweredQuestions = createSelector(
  surveyFeature,
  (state) => state.answeredQuestions
);
