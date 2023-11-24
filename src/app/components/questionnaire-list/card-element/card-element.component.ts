import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { IAnswer, IQuestion } from 'src/app/interfaces/questionnaire.interface';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';
import { selectAnswers } from 'src/app/store/selectors/questionnaire.selectors';
import * as QuestionnaireActions from '../../../store/actions/questionnaire.actions';

/**
 * A component of the card element in a Questionnaire List
 */
@Component({
  selector: 'card-element',
  templateUrl: 'card-element.component.html',
  styleUrls: ['card-element.component.scss'],
})
export class CardElement implements OnInit, OnDestroy {
  /**
   * Data of the question for a card
   */
  @Input() question!: IQuestion;
  /**
   * check if question is answered
   */
  @Input() isAnswered!: boolean;

  formReference?: FormGroupDirective;
  answerForm!: FormGroup;

  answers$ = this.store.select(selectAnswers);
  chosenAnswers!: IAnswer[];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initAnswerForm();

    // filter chosen answers from all options
    this.answers$.pipe(takeUntil(this.destroy$)).subscribe((answers) => {
      this.chosenAnswers = answers.filter(
        (answer) => answer.questionId === this.question.id
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Data of the question for a card
   *
   * @params event - MatCheckboxChange, captured on checkbox change
   *
   */
  onCheckChange(event: MatCheckboxChange) {
    const checkboxChoices: FormArray = this.answerForm.get(
      'answers'
    ) as FormArray;
    if (event.checked) {
      checkboxChoices.push(new FormControl(event.source.value));
    } else {
      // find the unselected element
      let i: number = 0;

      checkboxChoices.controls.forEach((ctrl) => {
        if (ctrl.value == event.source.value) {
          // Remove the unselected element from the arrayForm
          checkboxChoices.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  /**
   * Answer rollback
   */
  changeAnswer(question: IQuestion): void {
    this.store.dispatch(
      QuestionnaireActions.changeAnswer({ question: question })
    );
    //this.questionService.changeAnswer(question);
    window.location.reload();
  }

  onSubmit(): void {
    let value = this.answerForm.getRawValue();
    const answer: IAnswer = {
      questionId: this.question.id,
      answer: value.answers,
    };
    this.store.dispatch(QuestionnaireActions.answer({ answer: answer }));
    this.isAnswered = true;
    window.location.reload();
  }

  /**
   * initialize the answer form
   */
  private initAnswerForm(): void {
    if (this.question.type === 'multi') {
      this.answerForm = this.formBuilder.group({
        answers: this.formBuilder.array([], [Validators.required]),
      });
    } else {
      this.answerForm = this.formBuilder.group({
        answers: new FormControl<string>('', Validators.required),
      });
    }
  }
}
