import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IQuestion } from 'src/app/interfaces/questionnaire.interface';

/**
 * A component of a Delete dialog box
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  action: string = 'Delete';
  questionData!: IQuestion;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestion
  ) {
    this.questionData = { ...data };
  }

  deleteQuestion() {
    this.dialogRef.close({ event: this.action, data: this.questionData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
