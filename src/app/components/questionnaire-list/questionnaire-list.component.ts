import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';

import {
  selectAllQuestions,
  selectAnsweredQuestions,
  selectUnansweredQuestions,
} from 'src/app/store/selectors/questionnaire.selectors';
import * as SurveyActions from '../../store/actions/questionnaire.actions';
import { IQuestion } from 'src/app/interfaces/questionnaire.interface';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
})
export class SurveyListComponent implements OnInit, OnDestroy {
  unansweredQuestions$ = this.store.select(selectUnansweredQuestions);
  answeredQuestions$ = this.store.select(selectAnsweredQuestions);

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SurveyActions.getUnansweredQuestions());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
