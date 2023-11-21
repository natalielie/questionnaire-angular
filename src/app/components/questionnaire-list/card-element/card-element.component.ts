import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { IAnswer, IQuestion } from 'src/app/interfaces/questionnaire.interface';
import { AppState } from 'src/app/store/reducers/questionnaire.reducers';

import * as QuestionnaireActions from '../../../store/actions/questionnaire.actions';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  Observable,
  Subject,
  Subscribable,
  Subscription,
  takeUntil,
} from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  selectAnsweredQuestions,
  selectAnswers,
} from 'src/app/store/selectors/questionnaire.selectors';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'card-element',
  templateUrl: 'card-element.component.html',
  styleUrls: ['card-element.component.scss'],
})
export class CardElement implements OnInit, OnDestroy {
  @Input() question!: IQuestion;
  answeredQuestions$ = this.store.select(selectAnsweredQuestions);
  isAnswered!: boolean;
  formReference?: FormGroupDirective;
  questionForm!: FormGroup;
  chosenAnswers!: IAnswer[];

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionnaireActions.getAnswers());
    this.answeredQuestions$.pipe(takeUntil(this.$destroy)).subscribe((value) =>
      value.forEach((question) => {
        if (question.id === this.question.id) {
          this.isAnswered = true;
        } else {
          this.isAnswered = false;
        }
      })
    );
    if (this.question.type === 'multi') {
      this.questionForm = this.formBuilder.group({
        answers: this.formBuilder.array([], [Validators.required]),
      });
    } else {
      this.questionForm = this.formBuilder.group({
        answers: new FormControl<string>('', Validators.required),
      });
    }
    this.store
      .select(selectAnswers)
      .pipe(takeUntil(this.$destroy))
      .subscribe((answers) => {
        this.chosenAnswers = answers.filter(
          (answer) => answer.questionId === this.question.id
        );
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  onCheckChange(event: MatCheckboxChange) {
    const checkboxChoices: FormArray = this.questionForm.get(
      'answers'
    ) as FormArray;
    /* Selected */
    if (event.checked) {
      // Add a new control in the arrayForm
      checkboxChoices.push(new FormControl(event.source.value));
    } else {
      /* unselected */
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

  onSubmit(): void {
    let value = this.questionForm.getRawValue();
    const answer: IAnswer = {
      questionId: this.question.id,
      answer: value.answers,
    };
    this.questionService.answerTheQuestion(answer);
    window.location.reload();
  }
}
