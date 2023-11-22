import { createAction, props } from '@ngrx/store';
import { IAnswer, IQuestion } from 'src/app/interfaces/questionnaire.interface';

/** all questions */
export const getQuestions = createAction('[Questions] Get Questions');

export const questionsLoaded = createAction(
  '[Questions] Questions Loaded',
  props<{ questionsResponse: IQuestion[] }>()
);

export const questionsLoadError = createAction(
  '[Questions] Questions Not Loaded',
  props<{ error: string }>()
);

/** create a question */
export const createQuestion = createAction(
  '[Questions] Proceed Creation',
  props<{ question: IQuestion }>()
);

export const createQuestionLoaded = createAction('[Questions] Create Loaded');

export const createQuestionLoadError = createAction(
  '[Questions] Create Not Loaded',
  props<{ error: string }>()
);

/** update a question */
export const updateQuestion = createAction(
  '[Questions] Proceed Update',
  props<{ question: IQuestion }>()
);

export const updateQuestionLoaded = createAction('[Questions] Update Loaded');

export const updateQuestionLoadError = createAction(
  '[Questions] Update Not Loaded',
  props<{ error: string }>()
);

/** delete a question */
export const deleteQuestion = createAction(
  '[Questions] Proceed Delete',
  props<{ questionId: string }>()
);

export const deleteQuestionLoaded = createAction('[Questions] Delete Loaded');

export const deleteQuestionLoadError = createAction(
  '[Questions] Delete Not Loaded',
  props<{ error: string }>()
);

/** answer the question */
export const answer = createAction(
  '[Answers] Proceed Answer',
  props<{ answer: IAnswer }>()
);

export const answerLoaded = createAction('[Answers] Answer Loaded');

export const answerLoadError = createAction(
  '[Answers] Answer Not Loaded',
  props<{ error: string }>()
);

/** change an answer */
export const changeAnswer = createAction(
  '[Answers] Proceed Change Answer',
  props<{ question: IQuestion }>()
);

export const changeAnswerLoaded = createAction(
  '[Answers] Change Answer Loaded'
);

export const changeAnswerLoadError = createAction(
  '[Answers] Change Answer Not Loaded',
  props<{ error: string }>()
);

/** answers */
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

/** set answers */
export const setAnswer = createAction('[Answers] Set Answer');

export const setAnswerLoaded = createAction(
  '[Answers] Answer the Question Loaded',
  props<{ answerResponse: IAnswer[] }>()
);

export const setAanswerLoadError = createAction(
  '[Answers] Answer the Question Not Loaded',
  props<{ error: string }>()
);
