import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as uuid from 'uuid';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { QuestionService } from 'src/app/services/question.service';
import { IQuestion } from 'src/app/interfaces/questionnaire.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { managementPath } from 'src/app/shared/globals';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';
import { Store } from '@ngrx/store';
import { selectAllQuestions } from 'src/app/store/selectors/questionnaire.selectors';
import * as QuestionnaireActions from '../../store/actions/questionnaire.actions';

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss'],
})
export class CreateQuestionnaireComponent implements OnInit {
  /**
   * A reference to the `questionForm` template within the component's view.
   * Allows working with a form reference, not form itself
   */
  @ViewChild('questionForm', { static: false })
  formReference?: FormGroupDirective;
  questionForm!: FormGroup;

  isEdit!: boolean;
  selectedQuestion!: IQuestion;

  // allQuestionTypes: string[] = [
  //   'Single Choice Question',
  //   'Multiple Choice Question',
  //   'Open Question',
  // ];
  allQuestionTypes: string[] = ['single', 'multi', 'open'];

  /**
   * A subject to prevent memory leaks
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
  ) {}

  /**
   * creating form's form controls with validators
   */
  ngOnInit() {
    let id = this.route.snapshot.queryParamMap.get('id') as string;

    this.questionForm = this.formBuilder.group({
      questionType: new FormControl<string>(''),
      question: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      possibleAnswers: this.formBuilder.array([
        new FormControl<string>('', [
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
        new FormControl<string>('', [
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
      ]),
    });
    if (id) {
      this.isEdit = true;

      this.store.dispatch(QuestionnaireActions.getQuestions());

      this.store.select(selectAllQuestions).subscribe((questions) => {
        this.selectedQuestion = questions.find(
          (question) => question.id === id
        )!;
        this.questionForm = this.formBuilder.group({
          questionType: new FormControl<string>(this.selectedQuestion.type),
          question: new FormControl<string>(this.selectedQuestion.question, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50),
          ]),
          possibleAnswers: this.initAnswers(this.selectedQuestion),
        });
      });
    }
  }

  get possibleAnswers(): FormArray {
    return this.questionForm.get('possibleAnswers') as FormArray;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addNewOption(): void {
    this.possibleAnswers.push(this.formBuilder.control(''));
  }

  /**
   * deleting a hobby on user's request
   */
  removeOption(index: number): void {
    this.possibleAnswers.removeAt(index);
  }

  showAnswerOptions(): boolean {
    return (
      this.questionForm.controls['questionType'].value !== '' &&
      this.questionForm.controls['questionType'].value !== 'open'
    );
  }

  // convertQuestionType(type: number): string {
  //   switch (type) {
  //     case 0:
  //       return 'single';
  //     case 1:
  //       return 'multi';
  //     case 2:
  //       return 'open';
  //     default:
  //       return 'Not specified';
  //   }
  // }

  onSubmit(): void {
    if (this.questionForm.valid) {
      let data = this.questionForm.getRawValue();
      let type = data.questionType;

      if (!this.isEdit) {
        let newQuestion: IQuestion = {
          id: this.generateID(),
          question: data.question,
          type: type,
          answers: data.possibleAnswers ?? null,
          creationDate: new Date(),
        };
        this.questionService.createQuestion(newQuestion);
        this.formReference?.resetForm();
        this.possibleAnswers.clear();
        this.router.navigate([managementPath]);
      } else {
        let updatedQuestion: IQuestion = {
          id: this.selectedQuestion.id,
          question: data.question,
          type: type,
          answers: data.possibleAnswers ?? null,
          creationDate: new Date(),
        };
        this.questionService.updateQuestion(updatedQuestion);
        this.formReference?.resetForm();
        this.possibleAnswers.clear();
        this.router.navigate([managementPath]);
      }
    } else {
      alert('Something went wrong, try again, please');
    }
  }

  initAnswers(
    question: IQuestion
  ): FormArray<FormControl<string | null>> | null {
    if (question.type !== 'open') {
      return this.formBuilder.array(question.answers);
    }
    return null;
  }

  generateID(): string {
    return uuid.v4();
  }

  returnBack(): void {
    this.location.back();
  }
}
