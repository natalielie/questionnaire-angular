import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/questionnaire.reducers';

export const questionnaireFeature =
  createFeatureSelector<AppState>('questionnaireData');

export const selectAllQuestions = createSelector(
  questionnaireFeature,
  (state) => state.questions
);

export const selectAnswers = createSelector(
  questionnaireFeature,
  (state) => state.answers
);
