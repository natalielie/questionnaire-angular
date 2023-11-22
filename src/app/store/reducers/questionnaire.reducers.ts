import { createReducer, on } from '@ngrx/store';

import * as QuestionnaireActions from '../actions/questionnaire.actions';
import { IAnswer, IQuestion } from 'src/app/interfaces/questionnaire.interface';

export interface AppState {
  questions: IQuestion[];
  answers: IAnswer[];
  error: string | null;
}

export const initialState: AppState = {
  questions: [],
  answers: [],
  error: null,
};

export const questionnaireReducers = createReducer(
  initialState,
  // all questions
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
  // create a question
  on(QuestionnaireActions.createQuestion, (state, { question }) => {
    const result = {
      ...state,
      questions: [...state.questions, question],
    };

    return result;
  }),
  on(QuestionnaireActions.createQuestionLoaded, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.createQuestionLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // update a question
  on(QuestionnaireActions.updateQuestion, (state, { question }) => {
    const result = {
      ...state,
      questions: [...state.questions, question],
    };
    return result;
  }),
  on(QuestionnaireActions.updateQuestionLoaded, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.updateQuestionLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // delete a question
  on(QuestionnaireActions.deleteQuestion, (state, { questionId }) => {
    const questions = [...state.questions];
    const index = questions.findIndex((question) => question.id === questionId);
    questions.splice(index, 1);
    const result = {
      ...state,
      questions: questions,
    };
    return result;
  }),
  on(QuestionnaireActions.deleteQuestionLoaded, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.deleteQuestionLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // answer the question
  on(QuestionnaireActions.answer, (state, { answer }) => {
    const result = {
      ...state,
      answers: [...state.answers, answer],
    };

    return result;
  }),
  on(QuestionnaireActions.answerLoaded, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.answerLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // change answer
  on(QuestionnaireActions.changeAnswer, (state, { question }) => {
    const result = {
      ...state,
      questions: [...state.questions, question],
    };
    return result;
  }),
  on(QuestionnaireActions.changeAnswerLoaded, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(QuestionnaireActions.changeAnswerLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // answered questions
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
  // unanswered questions
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
  // answers
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
