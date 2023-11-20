import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { IAnswer, IQuestion } from 'src/app/interfaces/survey.interface';
import { AppState } from 'src/app/store/reducers/survey.reducers';

import * as SurveyActions from '../../../store/actions/survey.actions';
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
import { selectAnsweredQuestions } from 'src/app/store/selectors/survey.selectors';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'card-element',
  templateUrl: 'card-element.component.html',
  styleUrls: ['card-element.component.scss'],
})
export class CardElement implements OnInit, OnDestroy {
  @Input() question!: IQuestion;
  answeredQuestions$ = this.store.select(selectAnsweredQuestions);
  isAnswered: boolean = false;
  formReference?: FormGroupDirective;
  questionForm!: FormGroup;

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    //this.store.dispatch(SurveyActions.getAnsweredQuestions());
    // this.answeredQuestions$.pipe(takeUntil(this.$destroy)).subscribe((value) =>
    //   value.forEach((question) => {
    //     if (question === this.question.id) {
    //       this.isAnswered = true;
    //     } else {
    //       this.isAnswered = false;
    //     }
    //   })
    // );
    if (this.question.type === 1) {
      this.questionForm = this.formBuilder.group({
        answers: this.formBuilder.array([], [Validators.required]), //('', Validators.required),
      });
    } else {
      this.questionForm = this.formBuilder.group({
        answers: new FormControl<string>('', Validators.required),
      });
    }
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
    this.localStorageService.answerTheQuestion(answer);
    window.location.reload();
  }
}
