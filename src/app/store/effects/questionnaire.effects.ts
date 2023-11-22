import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as QuestionnaireActions from '../actions/questionnaire.actions';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { QuestionService } from 'src/app/services/question.service';

@Injectable()
export class QuestionnaireEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private questionService: QuestionService
  ) {}

  public getAllQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.getQuestions),

      map(() => {
        const storageValue = this.localStorageService.getAllQuestions();
        if (storageValue) {
          try {
            return QuestionnaireActions.questionsLoaded({
              questionsResponse: storageValue,
            });
          } catch {
            QuestionnaireActions.questionsLoadError({
              error: 'Questions loading failed',
            });
          }
        }
        return QuestionnaireActions.questionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );

  public getAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.getAnswers),

      map(() => {
        const storageValue = this.localStorageService.getAnswers();
        if (storageValue) {
          try {
            return QuestionnaireActions.answersLoaded({
              answerResponse: storageValue,
            });
          } catch {
            QuestionnaireActions.answersLoadError({
              error: 'Answers loading failed',
            });
          }
        }
        return QuestionnaireActions.answersLoadError({
          error: 'Answers loading failed',
        });
      })
    )
  );

  public getAnsweredQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.getAnsweredQuestions),

      map(() => {
        let questions = this.localStorageService.getAllQuestions();

        questions = questions.filter((question) => question.answerDate);
        if (questions) {
          try {
            return QuestionnaireActions.answeredQuestionsLoaded({
              questionsResponse: questions,
            });
          } catch {
            QuestionnaireActions.answeredQuestionsLoadError({
              error: 'Questions loading failed',
            });
          }
        }
        return QuestionnaireActions.answeredQuestionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );

  public getUnansweredQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.getUnansweredQuestions),

      map(() => {
        let questions = this.localStorageService.getAllQuestions();

        questions = questions.filter((question) => !question.answerDate);

        if (questions) {
          try {
            return QuestionnaireActions.unansweredQuestionsLoaded({
              questionsResponse: questions,
            });
          } catch {
            QuestionnaireActions.unansweredQuestionsLoadError({
              error: 'Questions loading failed',
            });
          }
        }
        return QuestionnaireActions.unansweredQuestionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );

  public createQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.createQuestion),

      map(({ question }) => {
        try {
          this.questionService.createQuestion(question);

          return QuestionnaireActions.createQuestionLoaded();
        } catch {
          QuestionnaireActions.createQuestionLoadError({
            error: 'Create failed',
          });
        }
        return QuestionnaireActions.createQuestionLoadError({
          error: 'Create failed',
        });
      })
    )
  );

  public updateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.updateQuestion),

      map(({ question }) => {
        try {
          this.questionService.updateQuestion(question);

          return QuestionnaireActions.updateQuestionLoaded();
        } catch {
          QuestionnaireActions.updateQuestionLoadError({
            error: 'Update failed',
          });
        }
        return QuestionnaireActions.updateQuestionLoadError({
          error: 'Update failed',
        });
      })
    )
  );

  public deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.deleteQuestion),

      map(({ questionId }) => {
        try {
          this.questionService.deleteQuestion(questionId);

          return QuestionnaireActions.deleteQuestionLoaded();
        } catch {
          QuestionnaireActions.deleteQuestionLoadError({
            error: 'Update failed',
          });
        }
        return QuestionnaireActions.deleteQuestionLoadError({
          error: 'Update failed',
        });
      })
    )
  );

  public answer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.answer),

      map(({ answer }) => {
        try {
          this.questionService.answerTheQuestion(answer);

          return QuestionnaireActions.answerLoaded();
        } catch {
          QuestionnaireActions.answerLoadError({
            error: 'Answer failed',
          });
        }
        return QuestionnaireActions.answerLoadError({
          error: 'Answer failed',
        });
      })
    )
  );

  public changeAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionnaireActions.changeAnswer),

      map(({ question }) => {
        try {
          this.questionService.changeAnswer(question);

          return QuestionnaireActions.changeAnswerLoaded();
        } catch {
          QuestionnaireActions.changeAnswerLoadError({
            error: 'Change failed',
          });
        }
        return QuestionnaireActions.changeAnswerLoadError({
          error: 'Change failed',
        });
      })
    )
  );
}
