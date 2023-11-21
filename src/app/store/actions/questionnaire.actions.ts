import { createAction, props } from '@ngrx/store';
import { IAnswer, IQuestion } from 'src/app/interfaces/questionnaire.interface';

export const getQuestions = createAction('[Questions] Get Questions');

export const questionsLoaded = createAction(
  '[Questions] Questions Loaded',
  props<{ questionsResponse: IQuestion[] }>()
);

export const questionsLoadError = createAction(
  '[Questions] Questions Not Loaded',
  props<{ error: string }>()
);

export const getAnswers = createAction('[Answers] Get Answers');

export const answersLoaded = createAction(
  '[Answers] Answers Loaded',
  props<{ answerResponse: IAnswer[] }>()
);

export const answersLoadError = createAction(
  '[Answers] Answers Not Loaded',
  props<{ error: string }>()
);

/** unanswered questions */
export const getUnansweredQuestions = createAction(
  '[Answers] Get Unanswered Questions'
);

export const unansweredQuestionsLoaded = createAction(
  '[Answers] Unanswered Questions Loaded',
  props<{ questionsResponse: IQuestion[] }>()
);

export const unansweredQuestionsLoadError = createAction(
  '[Answers] Unanswered Questions Not Loaded',
  props<{ error: string }>()
);

/** answered questions */
export const getAnsweredQuestions = createAction(
  '[Answers] Get Unanswered Questions'
);

export const answeredQuestionsLoaded = createAction(
  '[Answers] Answered Questions Loaded',
  props<{ questionsResponse: IQuestion[] }>()
);

export const answeredQuestionsLoadError = createAction(
  '[Answers] Answered Questions Not Loaded',
  props<{ error: string }>()
);

/** answers */
export const setAnswer = createAction('[Answers] Set Answer');

export const setAnswerLoaded = createAction(
  '[Answers] Answer the Question Loaded',
  props<{ answerResponse: IAnswer[] }>()
);

export const setAanswerLoadError = createAction(
  '[Answers] Answer the Question Not Loaded',
  props<{ error: string }>()
);
