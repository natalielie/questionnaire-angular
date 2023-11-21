import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as QuestionnaireActions from '../actions/questionnaire.actions';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Injectable()
export class QuestionnaireEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
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
            localStorage.removeItem('state');
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
            //localStorage.removeItem('state');
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
        const storageValue = this.localStorageService.getAnsweredQuestions();
        if (storageValue) {
          try {
            return QuestionnaireActions.answeredQuestionsLoaded({
              questionsResponse: storageValue,
            });
          } catch {
            //localStorage.removeItem('state');
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

        const answeredQuestions =
          this.localStorageService.getAnsweredQuestions();
        if (!answeredQuestions) {
          return QuestionnaireActions.unansweredQuestionsLoaded({
            questionsResponse: questions,
          });
        }
        answeredQuestions.forEach((answered) => {
          questions = questions.filter(
            (question) => question.id !== answered.id
          );
        });

        if (questions) {
          try {
            return QuestionnaireActions.unansweredQuestionsLoaded({
              questionsResponse: questions,
            });
          } catch {
            //localStorage.removeItem('state');
          }
        }
        return QuestionnaireActions.unansweredQuestionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );
}
