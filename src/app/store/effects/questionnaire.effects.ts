import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SurveyActions from '../actions/questionnaire.actions';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Injectable()
export class SurveyEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public getAllQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.getQuestions),

      map(() => {
        const storageValue = this.localStorageService.getAllQuestions();
        if (storageValue) {
          try {
            return SurveyActions.questionsLoaded({
              questionsResponse: storageValue,
            });
          } catch {
            localStorage.removeItem('state');
          }
        }
        return SurveyActions.questionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );

  public getAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.getAnswers),

      map(() => {
        const storageValue = this.localStorageService.getAnswers();
        if (storageValue) {
          try {
            return SurveyActions.answersLoaded({
              answerResponse: storageValue,
            });
          } catch {
            //localStorage.removeItem('state');
          }
        }
        return SurveyActions.answersLoadError({
          error: 'Answers loading failed',
        });
      })
    )
  );

  public getAnsweredQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.getAnsweredQuestions),

      map(() => {
        const storageValue = this.localStorageService.getAnsweredQuestions();
        if (storageValue) {
          try {
            return SurveyActions.answeredQuestionsLoaded({
              questionsResponse: storageValue,
            });
          } catch {
            //localStorage.removeItem('state');
          }
        }
        return SurveyActions.answeredQuestionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );

  public getUnansweredQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyActions.getUnansweredQuestions),

      map(() => {
        let questions = this.localStorageService.getAllQuestions();

        const answeredQuestions =
          this.localStorageService.getAnsweredQuestions();
        if (!answeredQuestions) {
          return SurveyActions.unansweredQuestionsLoaded({
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
            return SurveyActions.unansweredQuestionsLoaded({
              questionsResponse: questions,
            });
          } catch {
            //localStorage.removeItem('state');
          }
        }
        return SurveyActions.unansweredQuestionsLoadError({
          error: 'Questions loading failed',
        });
      })
    )
  );
}
