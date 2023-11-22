import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Store } from '@ngrx/store';

import { managementPath } from 'src/app/shared/globals';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';
import { selectAllQuestions } from 'src/app/store/selectors/questionnaire.selectors';
import * as QuestionnaireActions from '../../store/actions/questionnaire.actions';

/**
 * A component of Create and Edit pages
 */
@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss'],
})
export class CreateQuestionnaireComponent implements OnInit {
  @ViewChild('questionForm', { static: false })
  /**
   * A reference to the `questionForm` template within the component's view.
   * Allows working with a form reference, not form itself
   */
  formReference?: FormGroupDirective;
  questionForm!: FormGroup;

  isEdit!: boolean;

  selectedQuestion!: IQuestion;

  allQuestionTypes: string[] = ['single', 'multi', 'open'];

  id = this.route.snapshot.queryParamMap.get('id') as string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
  ) {}

  /**
   * creating form's form controls with validators
   */
  ngOnInit() {
    if (this.id === null) {
      this.initCreateForm();
    } else {
      this.initEditForm();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initCreateForm(): void {
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
  }

  initEditForm(): void {
    this.isEdit = true;

    this.store.dispatch(QuestionnaireActions.getQuestions());

    this.store.select(selectAllQuestions).subscribe((questions) => {
      this.selectedQuestion = questions.find(
        (question) => question.id === this.id
      )!;
      this.questionForm = this.formBuilder.group({
        questionType: new FormControl<string>(this.selectedQuestion.type),
        question: new FormControl<string>(this.selectedQuestion.question, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
        possibleAnswers: this.formBuilder.array(this.selectedQuestion.answers),
      });
    });

    if (this.selectedQuestion.type === 'open') {
      this.addNewOption();
    }
  }

  /**
   * get all answer options
   */
  get possibleAnswers(): FormArray {
    return this.questionForm.get('possibleAnswers') as FormArray;
  }

  /**
   * adding an answer option on user's request
   */
  addNewOption(): void {
    this.possibleAnswers.push(this.formBuilder.control(''));
  }

  /**
   * deleting an answer option on user's request
   *
   * @params index - index of the option
   */
  removeOption(index: number): void {
    this.possibleAnswers.removeAt(index);
  }

  /**
   * show answer options if a single or multiple choice question
   */
  showAnswerOptions(): boolean {
    return (
      this.questionForm.controls['questionType'].value !== '' &&
      this.questionForm.controls['questionType'].value !== 'open'
    );
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      if (!this.isEdit) {
        this.createOnSubmit();
      } else {
        this.editOnSubmit();
      }
    } else {
      alert('Something went wrong, try again, please');
    }
  }

  createOnSubmit(): void {
    const data = this.questionForm.getRawValue();
    const newQuestion: IQuestion = {
      id: this.generateID(),
      question: data.question,
      type: data.questionType,
      answers: data.possibleAnswers,
      creationDate: new Date(),
      answerDate: null,
    };
    this.store.dispatch(
      QuestionnaireActions.createQuestion({ question: newQuestion })
    );
    this.formReference?.resetForm();
    this.possibleAnswers.clear();
    this.router.navigate([managementPath]);
  }

  editOnSubmit(): void {
    const data = this.questionForm.getRawValue();
    const updatedQuestion: IQuestion = {
      id: this.selectedQuestion.id,
      question: data.question,
      type: data.questionType,
      answers: data.possibleAnswers,
      creationDate: new Date(),
      answerDate: null,
    };
    this.store.dispatch(
      QuestionnaireActions.updateQuestion({ question: updatedQuestion })
    );
    this.formReference?.resetForm();
    this.possibleAnswers.clear();
    this.router.navigate([managementPath]);
  }

  generateID(): string {
    return uuid.v4();
  }

  returnBack(): void {
    this.location.back();
  }
}
