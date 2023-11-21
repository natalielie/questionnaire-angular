import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { IQuestion } from 'src/app/interfaces/questionnaire.interface';
import { MatSortModule, Sort } from '@angular/material/sort';
import {
  selectAllQuestions,
  selectQuestionnaireData,
} from 'src/app/store/selectors/questionnaire.selectors';
import * as QuestionnaireActions from '../../store/actions/questionnaire.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { createPath, editPath } from 'src/app/shared/globals';
import { QuestionService } from 'src/app/services/question.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
})
export class ManagementPageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'question',
    'questionType',
    'creationDate',
    'action',
  ];
  dataSource$ = this.store.select(selectAllQuestions);
  allDataSource = new MatTableDataSource<IQuestion>([]);
  page =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageIndex') as string,
      10
    ) ?? 0;
  pageSize =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageSize') as string,
      10
    ) ?? 3;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionnaireActions.getQuestions());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource!.data = value;

      if (this.paginator) {
        this.paginator.pageIndex = this.page;
        this.paginator.pageSize = this.pageSize;
        this.allDataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * updating page index and size of the paginator
   */
  updateRouteParameters($event: PageEvent | null): void {
    const params = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };
    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
    //Update route with Query Params
    this.location.go(urlTree.toString());
  }

  questionTypeChange(type: string): string {
    switch (type) {
      case 'single':
        return 'Single Choice';
      case 'multi':
        return 'Multiple Choice';
      case 'open':
        return 'Open';
      default:
        return 'Not Specified';
    }
  }

  openDialog(action: string, question: IQuestion) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: question,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { event: string; data: IQuestion }) => {
        if (result.event == 'Delete') {
          this.deleteRowData(result.data);
        }
      });
  }

  deleteRowData(question: IQuestion) {
    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      value.forEach((element) => {
        if (element.id === question.id) {
          this.questionService.deleteQuestion(element.id);
        }
      });
    });
    window.location.reload();
  }

  goToCreateQuestion(): void {
    this.router.navigate([createPath]);
  }

  editQuestion(question: IQuestion): void {
    //const params = new HttpParams().set('id', question.id);
    this.router.navigate(['create-questionnaire/'], {
      queryParams: { id: question.id },
    });
  }
}
