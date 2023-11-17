import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { IQuestion } from 'src/app/interfaces/survey.interface';
import { MatSortModule } from '@angular/material/sort';
import {
  selectAllQuestions,
  selectSurveyData,
} from 'src/app/store/selectors/survey.selectors';
import * as SurveyActions from '../../store/actions/survey.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/survey.reducers';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { createPath } from 'src/app/shared/globals';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SurveyActions.getQuestions());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
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

  questionTypeChange(type: number): string {
    switch (type) {
      case 0:
        return 'Single Choice';
      case 1:
        return 'Multiple Choice';
      case 2:
        return 'Open';
      default:
        return 'Not Specified';
    }
  }

  openDialog(action: string, obj: { action: any }) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { event: string; data: any }) => {
        if (result.event == 'Add') {
          // this.addRowData(result.data);
        } else if (result.event == 'Update') {
          // this.updateRowData(result.data);
        } else if (result.event == 'Delete') {
          // this.deleteRowData(result.data);
        }
      });
  }

  // addRowData(row_obj){
  //   var d = new Date();
  //   this.dataSource.push({
  //     id:d.getTime(),
  //     name:row_obj.name
  //   });
  //   this.table.renderRows();

  // }
  // updateRowData(row_obj){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
  // deleteRowData(row_obj){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
  // }

  goToCreateQuestion(): void {
    this.router.navigate([createPath]);
  }
}
