import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { IQuestion } from 'src/app/interfaces/questionnaire.interface';
import { selectAllQuestions } from 'src/app/store/selectors/questionnaire.selectors';
import * as QuestionnaireActions from '../../store/actions/questionnaire.actions';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { createPath } from 'src/app/shared/globals';

/**
 * A component of the Management Page
 */
@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
})
export class ManagementPageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

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
      this.route.snapshot.queryParamMap.get('pageIndex') as string
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionnaireActions.getQuestions());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource.data = value;
      this.allDataSource.paginator = this.paginator;
      this.allDataSource.sort = this.sort;

      if (this.paginator) {
        this.paginator.pageIndex = this.page;
        this.paginator.pageSize = this.pageSize;
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
        return 'Open Question';
      default:
        return 'Not Specified';
    }
  }

  /**
   * open a dialog box on delete
   */
  openDialog(question: IQuestion) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: question,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { event: string; data: IQuestion }) => {
        if (result.event == 'Delete') {
          this.deleteQuestion(result.data);
        }
      });
  }

  deleteQuestion(question: IQuestion) {
    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      value.forEach((element) => {
        if (element.id === question.id) {
          this.store.dispatch(
            QuestionnaireActions.deleteQuestion({ questionId: element.id })
          );
        }
      });
    });
    window.location.reload();
  }

  goToCreateQuestion(): void {
    this.router.navigate([createPath]);
  }

  goToEditQuestion(question: IQuestion): void {
    this.router.navigate([createPath], {
      queryParams: { id: question.id },
    });
  }
}
