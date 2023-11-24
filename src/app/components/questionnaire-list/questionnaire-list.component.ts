import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';

import { selectAllQuestions } from 'src/app/store/selectors/questionnaire.selectors';
import * as QuestionnaireActions from '../../store/actions/questionnaire.actions';
import { IQuestion } from 'src/app/interfaces/questionnaire.interface';

/**
 * A component of Questionnaire List page
 */
@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
})
export class QuestionnaireListComponent implements OnInit, OnDestroy {
  questions$ = this.store.select(selectAllQuestions);
  unansweredQuestions!: IQuestion[];
  answeredQuestions!: IQuestion[];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionnaireActions.getQuestions());
    this.store.dispatch(QuestionnaireActions.getAllAnswers());
    this.questions$.pipe(takeUntil(this.destroy$)).subscribe((questions) => {
      this.unansweredQuestions = questions.filter(
        (question) => !question.answerDate
      );
      this.answeredQuestions = questions.filter(
        (question) => question.answerDate
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
