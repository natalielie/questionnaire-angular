import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/reducers/survey.reducers';

import {
  selectAllQuestions,
  selectAnsweredQuestions,
  selectUnansweredQuestions,
} from 'src/app/store/selectors/survey.selectors';
import * as SurveyActions from '../../store/actions/survey.actions';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {
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
    this.store.dispatch(SurveyActions.getAnsweredQuestions());
    console.log(this.answeredQuestions$);
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }
}
